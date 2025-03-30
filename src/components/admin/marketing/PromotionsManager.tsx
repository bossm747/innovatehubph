
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PromoCode } from '@/utils/aiProviders';
import { CalendarIcon, Plus, Gift, Trash2, Copy, Tag, Check, RefreshCw, AlertCircle, ArrowDown, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const PromotionsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('promo-codes');
  const [isLoading, setIsLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [formData, setFormData] = useState({
    code: '',
    discount: 10,
    discountType: 'percentage',
    validFrom: new Date(),
    validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxUses: 100,
    description: '',
    applicableTo: ['platapay']
  });

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchPromoCodes();
  }, [refreshKey]);

  const fetchPromoCodes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map database response to our PromoCode interface
      const mappedPromoCodes: PromoCode[] = (data || []).map(promo => ({
        id: promo.id,
        code: promo.code,
        discount: promo.discount,
        discountType: promo.discount_type as 'percentage' | 'fixed',
        discount_type: promo.discount_type,
        validFrom: promo.valid_from,
        valid_from: promo.valid_from,
        validTo: promo.valid_to,
        valid_to: promo.valid_to,
        maxUses: promo.max_uses,
        max_uses: promo.max_uses,
        timesUsed: promo.times_used,
        times_used: promo.times_used,
        active: promo.active,
        description: promo.description,
        applicableTo: promo.applicable_to,
        applicable_to: promo.applicable_to,
        created_at: promo.created_at,
        updated_at: promo.updated_at
      }));
      
      setPromoCodes(mappedPromoCodes);
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      toast({
        title: 'Error fetching promo codes',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, [name]: date }));
    }
  };

  const handleApplicableToChange = (value: string) => {
    setFormData(prev => {
      const currentApplicableTo = [...(prev.applicableTo || [])];
      
      if (currentApplicableTo.includes(value)) {
        return {
          ...prev,
          applicableTo: currentApplicableTo.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          applicableTo: [...currentApplicableTo, value]
        };
      }
    });
  };

  const createPromoCode = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .insert({
          code: formData.code,
          discount: Number(formData.discount),
          discount_type: formData.discountType,
          valid_from: formData.validFrom.toISOString(),
          valid_to: formData.validTo.toISOString(),
          max_uses: Number(formData.maxUses),
          times_used: 0,
          active: true,
          description: formData.description,
          applicable_to: formData.applicableTo
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setShowDialog(false);
      setRefreshKey(prev => prev + 1);
      
      toast({
        title: 'Promo code created',
        description: `The promo code ${formData.code} has been created successfully.`
      });
      
      // Reset form
      setFormData({
        code: '',
        discount: 10,
        discountType: 'percentage',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxUses: 100,
        description: '',
        applicableTo: ['platapay']
      });
    } catch (error) {
      console.error('Error creating promo code:', error);
      toast({
        title: 'Error creating promo code',
        description: 'An error occurred while creating the promo code.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard',
      description: `Promo code ${code} copied to clipboard.`
    });
  };

  const togglePromoCodeStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('promo_codes')
        .update({ active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setRefreshKey(prev => prev + 1);
      
      toast({
        title: currentStatus ? 'Promo code deactivated' : 'Promo code activated',
        description: `The promo code has been ${currentStatus ? 'deactivated' : 'activated'}.`
      });
    } catch (error) {
      console.error('Error updating promo code status:', error);
      toast({
        title: 'Error updating promo code',
        description: 'An error occurred while updating the promo code.',
        variant: 'destructive'
      });
    }
  };

  const deletePromoCode = async (id: string) => {
    try {
      const { error } = await supabase
        .from('promo_codes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setRefreshKey(prev => prev + 1);
      
      toast({
        title: 'Promo code deleted',
        description: 'The promo code has been deleted.'
      });
    } catch (error) {
      console.error('Error deleting promo code:', error);
      toast({
        title: 'Error deleting promo code',
        description: 'An error occurred while deleting the promo code.',
        variant: 'destructive'
      });
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const renderPromoCodesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Promo Codes</h2>
          <p className="text-muted-foreground">
            Create and manage promotional codes for your services
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Promo Code
        </Button>
      </div>

      {promoCodes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Tag className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">No promo codes yet</h3>
            <p className="text-center text-muted-foreground mb-4">
              Create your first promo code to start offering discounts to your customers.
            </p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Promo Code
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promoCodes.map(promo => (
            <Card key={promo.id} className="border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className={promo.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {promo.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <CardTitle className="mt-2 text-lg">{promo.code}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => copyPromoCode(promo.code)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => togglePromoCodeStatus(promo.id, promo.active)}
                    >
                      {promo.active ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePromoCode(promo.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-medium">
                      {promo.discount}{promo.discountType === 'percentage' ? '%' : ' USD'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valid:</span>
                    <span className="font-medium">
                      {formatDate(promo.validFrom)} - {formatDate(promo.validTo)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium">
                      {promo.timesUsed} / {promo.maxUses || '∞'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {promo.applicableTo?.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {promo.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {promo.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Promo Code</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g. SUMMER20"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleInputChange}
                  min={1}
                  max={100}
                  className="flex-1"
                />
                <Select 
                  value={formData.discountType} 
                  onValueChange={(value) => handleSelectChange('discountType', value)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percent</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Valid From
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.validFrom ? format(formData.validFrom, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.validFrom}
                      onSelect={(date) => handleDateChange('validFrom', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Valid To
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.validTo ? format(formData.validTo, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.validTo}
                      onSelect={(date) => handleDateChange('validTo', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxUses" className="text-right">
                Max Uses
              </Label>
              <Input
                id="maxUses"
                name="maxUses"
                type="number"
                value={formData.maxUses}
                onChange={handleInputChange}
                min={1}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Optional description"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Applicable To
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="platapay"
                    checked={formData.applicableTo.includes('platapay')}
                    onChange={() => handleApplicableToChange('platapay')}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="platapay">PlataPay</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="digital"
                    checked={formData.applicableTo.includes('digital')}
                    onChange={() => handleApplicableToChange('digital')}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="digital">Digital Customizations</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="ecommerce"
                    checked={formData.applicableTo.includes('ecommerce')}
                    onChange={() => handleApplicableToChange('ecommerce')}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="ecommerce">E-Commerce Solutions</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="ai"
                    checked={formData.applicableTo.includes('ai')}
                    onChange={() => handleApplicableToChange('ai')}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="ai">AI Solutions</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="global"
                    checked={formData.applicableTo.includes('global')}
                    onChange={() => handleApplicableToChange('global')}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="global">Global Expansion</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createPromoCode} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Promo Code'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderSpecialOffersTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="w-5 h-5 mr-2 text-purple-600" />
            Special Offers
          </CardTitle>
          <CardDescription>
            Create and manage special promotional offers for your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ArrowDown className="w-4 h-4 mr-2 text-green-600" />
                  Bundle Discounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Create special pricing when customers purchase multiple services together.</p>
                <Button variant="outline" className="w-full">
                  Create Bundle Offer
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                  Limited-Time Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Create time-sensitive special promotions for your services.</p>
                <Button variant="outline" className="w-full">
                  Create Limited-Time Offer
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted rounded-lg p-6 text-center">
            <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-xl font-medium">Expanded Offers Coming Soon</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              We're working on enhanced functionality to help you create more complex promotional offers including multi-service bundles, tiered discounts, and automated seasonal promotions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="promo-codes">Promo Codes</TabsTrigger>
          <TabsTrigger value="special-offers">Special Offers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="promo-codes">
          {renderPromoCodesTab()}
        </TabsContent>
        
        <TabsContent value="special-offers">
          {renderSpecialOffersTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;
