
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  showTimePicker?: boolean;
}

export function DatePicker({ date, setDate, showTimePicker = false }: DatePickerProps) {
  const [selectedHour, setSelectedHour] = React.useState("12");
  const [selectedMinute, setSelectedMinute] = React.useState("00");
  const [selectedAMPM, setSelectedAMPM] = React.useState("PM");

  // Update the date with time when time selections change
  React.useEffect(() => {
    if (date && showTimePicker) {
      const newDate = new Date(date);
      let hours = parseInt(selectedHour);
      
      // Convert to 24-hour format
      if (selectedAMPM === "PM" && hours < 12) {
        hours += 12;
      } else if (selectedAMPM === "AM" && hours === 12) {
        hours = 0;
      }
      
      newDate.setHours(hours);
      newDate.setMinutes(parseInt(selectedMinute));
      setDate(newDate);
    }
  }, [selectedHour, selectedMinute, selectedAMPM, date, showTimePicker, setDate]);

  // Initialize time values when date changes
  React.useEffect(() => {
    if (date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      // Convert to 12-hour format
      const ampm = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12;
      
      setSelectedHour(hours12.toString());
      setSelectedMinute(minutes.toString().padStart(2, "0"));
      setSelectedAMPM(ampm);
    }
  }, [date]);

  // Generate hours options: 1-12
  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
  // Generate minutes options: 00, 15, 30, 45
  const minuteOptions = ["00", "15", "30", "45"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            showTimePicker ? (
              format(date, "PPP p") // Format with time
            ) : (
              format(date, "PPP") // Format date only
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        
        {showTimePicker && date && (
          <div className="border-t p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex space-x-1">
              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <span className="flex items-center">:</span>
              
              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {minuteOptions.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedAMPM} onValueChange={setSelectedAMPM}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
