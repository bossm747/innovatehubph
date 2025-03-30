
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
  label?: string; // Added label property
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
  label = buttonText, // Use label or fallback to buttonText
  variant = 'default',
  buttonType = 'button',
  ...buttonProps
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant={variant}
        type={buttonType}
        {...buttonProps}
      >
        {label || buttonText}
      </Button>
      
      <BookingDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
