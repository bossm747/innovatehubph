
import React, { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Loader2, Copy, Download } from 'lucide-react';

const VoiceToTextTool = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      
      // Start the timer
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Microphone Access Error',
        description: 'Please allow microphone access to use this feature.',
        variant: 'destructive',
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume the timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };
  
  const transcribeAudio = async () => {
    if (!audioBlob) {
      toast({
        title: 'No Audio',
        description: 'Please record audio before transcribing.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create a form data object
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('voice-to-text', {
        body: formData,
      });
      
      if (error) throw error;
      
      if (data.text) {
        setTranscription(data.text);
        toast({
          title: 'Transcription Complete',
          description: 'Your audio has been successfully transcribed.',
        });
      } else {
        throw new Error('No transcription returned');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        title: 'Transcription Failed',
        description: error.message || 'An error occurred during transcription.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    toast({
      title: 'Copied!',
      description: 'Transcription copied to clipboard.',
    });
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([transcription], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcription-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mic className="mr-2 h-5 w-5 text-blue-500" />
              Voice Recorder
            </CardTitle>
            <CardDescription>
              Record your voice to convert to text
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="relative w-40 h-40 mb-6">
              <div className={`absolute inset-0 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-50 border-2 border-red-500' : 'bg-slate-50 border-2 border-slate-200'}`}>
                <div className={`w-32 h-32 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-500'} flex items-center justify-center`}>
                  {isRecording ? (
                    <MicOff className="h-12 w-12 text-white" />
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                </div>
              </div>
              {isRecording && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border shadow-sm">
                  <div className={`flex items-center ${isPaused ? 'text-orange-500' : 'text-red-500'}`}>
                    {isPaused ? (
                      <span>Paused</span>
                    ) : (
                      <>
                        <span className="mr-1">REC</span>
                        <span className="animate-pulse">●</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {isRecording && (
              <div className="text-2xl font-mono mb-4">
                {formatTime(recordingTime)}
              </div>
            )}
            
            <div className="flex gap-4">
              {!isRecording ? (
                <Button 
                  onClick={startRecording}
                  className="w-40"
                >
                  Start Recording
                </Button>
              ) : (
                <>
                  {!isPaused ? (
                    <Button 
                      variant="outline"
                      onClick={pauseRecording}
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      onClick={resumeRecording}
                    >
                      Resume
                    </Button>
                  )}
                  <Button 
                    variant="destructive"
                    onClick={stopRecording}
                  >
                    Stop Recording
                  </Button>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={transcribeAudio} 
              disabled={isProcessing || isRecording || !audioBlob} 
              className="w-full"
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? 'Transcribing...' : 'Transcribe Audio'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mic className="mr-2 h-5 w-5 text-green-500" />
              Transcription
            </CardTitle>
            <CardDescription>
              Converted text from your recording
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="py-10 flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Transcribing your audio...</p>
                  <Progress value={45} className="w-64" />
                </div>
              </div>
            ) : (
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Transcription will appear here..."
                className="min-h-[300px] resize-none"
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleCopyToClipboard}
              disabled={!transcription}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              disabled={!transcription}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VoiceToTextTool;
