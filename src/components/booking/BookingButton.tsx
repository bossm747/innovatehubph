
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import BookingDialog from './BookingDialog';

// Omit the type property from ButtonProps and define our own
interface BookingButtonProps extends Omit<ButtonProps, 'type' | 'onClick'> {
  meetingType?: 'call' | 'video';
  topic?: string;
  prefilledEmail?: string;
  prefilledName?: string;
  prefilledCompany?: string;
  buttonText?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonType?: 'button' | 'submit' | 'reset';
}

const BookingButton: React.FC<BookingButtonProps> = ({
  meetingType = 'call',
  topic = 'General Consultation',
  prefilledEmail = '',
  prefilledName = '',
  prefilledCompany = '',
  buttonText = 'Schedule a Meeting',
  variant = 'default',
  buttonType = 'button',
  ...buttonProps
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        variant={variant}
        type={buttonType}
        {...buttonProps}
      >
        {buttonText}
      </Button>
      
      <BookingDialog
        open={open}
        onOpenChange={setOpen}
        meetingType={meetingType}
        defaultTopic={topic}
        defaultEmail={prefilledEmail}
        defaultName={prefilledName}
        defaultCompany={prefilledCompany}
      />
    </>
  );
};

export default BookingButton;
