
import React, { useState } from 'react';
import { BookOpen, Mic, Save, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Journal = () => {
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [entries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      mood: 'Tired',
      emoji: '😴',
      preview: 'Had a rough night with the baby...',
      color: 'blue'
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 'Grateful',
      emoji: '🙏',
      preview: 'Feeling thankful for my support system...',
      color: 'green'
    },
    {
      id: 3,
      date: '2024-01-13',
      mood: 'Overwhelmed',
      emoji: '😰',
      preview: 'Everything feels like too much today...',
      color: 'orange'
    }
  ]);

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      toast({
        title: "Journal entry saved!",
        description: "Your thoughts have been recorded. Mood detected: Reflective 😌",
      });
      setCurrentEntry('');
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice recording started",
        description: "Speak freely, we're listening...",
      });
    } else {
      toast({
        title: "Voice recording saved",
        description: "Your voice entry has been transcribed and saved.",
      });
    }
  };

  const getMoodColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-200 text-blue-800',
      green: 'bg-green-100 border-green-200 text-green-800',
      orange: 'bg-orange-100 border-orange-200 text-orange-800',
      pink: 'bg-pink-100 border-pink-200 text-pink-800'
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <BookOpen className="h-16 w-16 text-pink-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Emotion Journal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Express your feelings freely. This is your safe space to process emotions and track your wellness journey.
        </p>
      </div>

      {/* New Entry Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Entry</h2>
        
        <div className="space-y-4">
          <Textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="How are you feeling today? What's on your mind? Remember, there's no judgment here..."
            className="min-h-32 text-lg border-gray-200 focus:border-pink-300 focus:ring-pink-200 rounded-2xl resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleVoiceRecord}
              variant={isRecording ? "destructive" : "outline"}
              className={`flex-1 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
            >
              <Mic className="h-4 w-4 mr-2" />
              {isRecording ? 'Stop Recording' : 'Voice Journal'}
            </Button>
            
            <Button
              onClick={handleSaveEntry}
              disabled={!currentEntry.trim()}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </div>

        {/* Mood Detection Nudge */}
        {currentEntry.length > 50 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <p className="text-blue-800 text-sm">
              💙 It sounds like you're feeling reflective today. Remember, it's okay to take things one moment at a time.
            </p>
          </div>
        )}
      </div>

      {/* Past Entries */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Previous Entries</h2>
        
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{entry.emoji}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMoodColor(entry.color)}`}>
                      {entry.mood}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{entry.preview}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;
