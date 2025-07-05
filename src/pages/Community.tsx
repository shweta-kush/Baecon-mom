
import React, { useState } from 'react';
import { Users, Heart, MessageCircle, Plus, Search, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Community = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const posts = [
    {
      id: 1,
      author: 'Sarah M.',
      isAnonymous: false,
      timeAgo: '2 hours ago',
      content: 'Just wanted to share that I finally got 6 hours of sleep last night! My 3-month-old slept through the night for the first time. I know it might not happen again for a while, but I\'m celebrating this small victory! 🎉',
      upvotes: 24,
      comments: 8,
      tags: ['Sleep', 'Milestones'],
      isSpotlight: true
    },
    {
      id: 2,
      author: 'Anonymous',
      isAnonymous: true,
      timeAgo: '4 hours ago',
      content: 'Feeling overwhelmed today. Baby has been crying non-stop and I feel like I\'m failing as a mom. Any tips for dealing with colic?',
      upvotes: 12,
      comments: 15,
      tags: ['Colic', 'Support', 'Overwhelmed']
    },
    {
      id: 3,
      author: 'Jessica K.',
      isAnonymous: false,
      timeAgo: '6 hours ago',
      content: 'Quick question: When did everyone start tummy time? My pediatrician said to start now but baby seems to hate it. Looking for encouragement and tips!',
      upvotes: 8,
      comments: 12,
      tags: ['Development', 'Tummy Time']
    },
    {
      id: 4,
      author: 'Anonymous',
      isAnonymous: true,
      timeAgo: '1 day ago',
      content: 'I love my baby so much, but I miss my old life. Is it normal to feel this way? Sometimes I feel guilty for wanting some time to myself.',
      upvotes: 31,
      comments: 22,
      tags: ['Identity', 'Self-Care', 'Guilt']
    }
  ];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      toast({
        title: "Post shared!",
        description: `Your ${isAnonymous ? 'anonymous ' : ''}post has been shared with the community.`,
      });
      setNewPost('');
      setIsAnonymous(false);
    }
  };

  const handleUpvote = (postId: number) => {
    toast({
      title: "Thanks for the support!",
      description: "Your upvote helps other moms find helpful content.",
    });
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'Sleep': 'bg-blue-100 text-blue-800',
      'Milestones': 'bg-green-100 text-green-800',
      'Colic': 'bg-red-100 text-red-800',
      'Support': 'bg-purple-100 text-purple-800',
      'Overwhelmed': 'bg-orange-100 text-orange-800',
      'Development': 'bg-teal-100 text-teal-800',
      'Identity': 'bg-pink-100 text-pink-800',
      'Self-Care': 'bg-green-100 text-green-800',
      'Guilt': 'bg-gray-100 text-gray-800'
    };
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Users className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Q&A</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with other moms, share experiences, and find support in our caring community.
        </p>
      </div>

      {/* Spotlight Story */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6 border-2 border-yellow-200">
        <div className="flex items-center space-x-2 mb-3">
          <Star className="h-6 w-6 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-800">Story Spotlight</h2>
        </div>
        {posts
          .filter(post => post.isSpotlight)
          .map(post => (
            <div key={post.id}>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">by {post.author}</span>
                  <div className="flex space-x-1">
                    {post.tags.map(tag => (
                      <span key={tag} className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{post.upvotes} moms found this helpful</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* New Post Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Share with the Community</h2>
        
        <div className="space-y-4">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Ask a question, share a story, or offer support to other moms..."
            className="min-h-24 border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-2xl resize-none"
          />
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
              className="border-purple-300"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-600">
              Post anonymously
            </label>
          </div>
          
          <Button
            onClick={handlePostSubmit}
            disabled={!newPost.trim()}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share Post
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts by topic..."
              className="rounded-full border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            />
          </div>
          <Button variant="outline" className="rounded-full">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        {posts
          .filter(post => !post.isSpotlight)
          .map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 font-semibold text-sm">
                      {post.isAnonymous ? '?' : post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">{post.author}</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(post.id)}
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {post.upvotes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Community;
