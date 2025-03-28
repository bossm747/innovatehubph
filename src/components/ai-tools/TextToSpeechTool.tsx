
import React, { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Loader2, Play, Pause, Download, List } from 'lucide-react';

const voices = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'Female' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'Male' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', gender: 'Female' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', gender: 'Male' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', gender: 'Female' },
  { id: 'pqHfZKP75CvOlQylNhV4', name: 'Bill', gender: 'Male' },
];

type SavedAudio = {
  id: string;
  text: string;
  audioUrl: string;
  date: Date;
  voice: string;
};

const TextToSpeechTool = () => {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('EXAVITQu4vr4xnSDxMaL');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedAudios, setSavedAudios] = useState<SavedAudio[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [volume, setVolume] = useState([50]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTextToSpeech = async () => {
    if (!text.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter text to convert to speech.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text,
          voiceId: selectedVoice,
        },
      });
      
      if (error) throw error;
      
      setAudioUrl(data.audio);
      
      // Save to history
      const newAudio: SavedAudio = {
        id: Date.now().toString(),
        text: text.length > 50 ? text.substring(0, 50) + '...' : text,
        audioUrl: data.audio,
        date: new Date(),
        voice: voices.find(v => v.id === selectedVoice)?.name || 'Unknown',
      };
      
      setSavedAudios(prev => [newAudio, ...prev]);
      
      toast({
        title: 'Audio Generated',
        description: 'Your text has been converted to speech!',
      });
    } catch (error) {
      console.error('Error generating speech:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'An error occurred while generating speech.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `speech-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleHistoryItemClick = (audio: SavedAudio) => {
    setAudioUrl(audio.audioUrl);
    setText(audio.text);
    setSelectedVoice(voices.find(v => v.name === audio.voice)?.id || selectedVoice);
    setIsPlaying(false);
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 className="mr-2 h-5 w-5 text-blue-500" />
                Text to Speech
              </CardTitle>
              <CardDescription>
                Convert your text to natural-sounding speech using AI voices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Voice</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name} ({voice.gender})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Text to Convert
                </label>
                <Textarea
                  placeholder="Enter text to convert to speech..."
                  rows={8}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {text.length} characters (max recommended: 3000)
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                onClick={handleTextToSpeech} 
                disabled={loading || !text.trim()} 
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Generating...' : 'Generate Speech'}
              </Button>
              
              {audioUrl && (
                <div className="w-full bg-slate-50 p-4 rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePlayPause}
                      className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex-1 mx-4">
                      <div className="text-sm font-medium mb-1">Volume</div>
                      <Slider
                        value={volume}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <audio 
                    ref={audioRef} 
                    src={audioUrl} 
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    className="hidden"
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-lg">
                  <List className="mr-2 h-5 w-5 text-gray-500" />
                  History
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowHistory(!showHistory)}
                  className="lg:hidden"
                >
                  {showHistory ? 'Hide' : 'Show'}
                </Button>
              </div>
              <CardDescription>
                Recently generated speech
              </CardDescription>
            </CardHeader>
            <CardContent className={`space-y-3 ${showHistory ? '' : 'hidden lg:block'}`}>
              {savedAudios.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No history yet. Generate some speech to see it here.
                </div>
              ) : (
                savedAudios.map(audio => (
                  <div 
                    key={audio.id} 
                    className="p-3 border rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => handleHistoryItemClick(audio)}
                  >
                    <div className="font-medium text-sm line-clamp-1">{audio.text}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        Voice: {audio.voice}
                      </span>
                      <span className="text-xs text-gray-500">
                        {audio.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeechTool;
