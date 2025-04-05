
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { submitBooking, getAvailableTimeSlots } from '@/services/bookingService';
import { toast } from 'sonner';
import GoogleCalendarBooking from './GoogleCalendarBooking';

interface BookingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  meetingType?: 'call' | 'video';
  defaultTopic?: string;
  defaultEmail?: string;
  defaultName?: string;
  defaultCompany?: string;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  setIsOpen,
  meetingType = 'call',
  defaultTopic = '',
  defaultEmail = '',
  defaultName = '',
  defaultCompany = '',
}) => {
  const [bookingTab, setBookingTab] = useState<'form' | 'calendar'>('calendar');
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [company, setCompany] = useState(defaultCompany);
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('30min');
  const [topic, setTopic] = useState(defaultTopic);
  const [notes, setNotes] = useState('');
  const [type, setType] = useState<'call' | 'video'>(meetingType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const availableTimeSlots = date ? getAvailableTimeSlots(date, duration) : [];
  
  const resetForm = () => {
    setName(defaultName);
    setEmail(defaultEmail);
    setCompany(defaultCompany);
    setPhone('');
    setDate(undefined);
    setTime('');
    setDuration('30min');
    setTopic(defaultTopic);
    setNotes('');
    setType(meetingType);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !date || !time) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitBooking({
        name,
        email,
        phone,
        company,
        date: date as Date,
        time,
        duration,
        type,
        topic,
        notes
      });
      
      if (result.success) {
        toast.success("Booking request submitted successfully!");
        setIsOpen(false);
        resetForm();
      } else {
        toast.error(result.error || "Failed to submit booking request");
      }
    } catch (error) {
      toast.error("An error occurred while submitting your booking request");
      console.error("Booking submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-innovate-600">Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Choose your preferred scheduling method below.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="calendar" onValueChange={(value) => setBookingTab(value as 'form' | 'calendar')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Google Calendar</TabsTrigger>
            <TabsTrigger value="form">Custom Form</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="py-4">
            <GoogleCalendarBooking />
          </TabsContent>
          
          <TabsContent value="form">
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email *</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <Input 
                    id="company" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium">Meeting Topic *</label>
                <Input 
                  id="topic" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meeting Type</label>
                  <Select value={type} onValueChange={(value) => setType(value as 'call' | 'video')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="video">Video Conference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">30 Minutes</SelectItem>
                      <SelectItem value="60min">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    disabled={{
                      before: new Date(),
                    }}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Available Time Slots</label>
                    <Select value={time} onValueChange={setTime} disabled={!date}>
                      <SelectTrigger>
                        <SelectValue placeholder={date ? "Select time" : "Select a date first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {date ? (
                          availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-slots-available" disabled>No available slots</SelectItem>
                          )
                        ) : (
                          <SelectItem value="select-date-first" disabled>Select a date first</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    
                    {date && time && (
                      <p className="text-sm text-gray-500">
                        Your meeting: {format(date, 'MMMM d, yyyy')} at {time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
                <Textarea 
                  id="notes" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information you'd like to provide"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !name || !email || !date || !time}
                >
                  {isSubmitting ? "Submitting..." : "Schedule Meeting"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
