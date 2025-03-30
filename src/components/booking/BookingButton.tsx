
import React, { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import BookingDialog from './BookingDialog';

interface BookingButtonProps extends Omit<ButtonProps, 'onClick'> {
  label?: string;
  topic?: string;
  type?: 'call' | 'video';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  icon?: boolean;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  label = "Schedule a Meeting",
  topic = "Demo Request",
  type = "video",
  variant = "default",
  icon = true,
  className,
  ...props
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button 
        variant={variant} 
        onClick={handleOpen} 
        className={className}
        {...props}
      >
        {icon && <CalendarClock className="w-4 h-4 mr-2" />}
        {label}
      </Button>
      
      <BookingDialog 
        isOpen={isDialogOpen} 
        onClose={handleClose} 
        defaultTopic={topic}
        defaultType={type}
      />
    </>
  );
};

export default BookingButton;
