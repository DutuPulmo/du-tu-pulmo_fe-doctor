import { useState } from 'react';
import { useMyReviews, useRespondToReview } from '@/hooks/use-reviews';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare, Reply, Clock, User, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';

export function ReviewsPage() {
  const { data: reviews, isLoading } = useMyReviews();
  const respondMutation = useRespondToReview();
  const [responseTexts, setResponseTexts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'all' | 'unreplied' | 'replied'>('all');

  const handleResponseChange = (reviewId: string, text: string) => {
    setResponseTexts(prev => ({ ...prev, [reviewId]: text }));
  };

  const handleSubmitResponse = async (reviewId: string) => {
    const text = responseTexts[reviewId];
    if (!text?.trim()) {
      toast.error('Vui lòng nhập nội dung phản hồi');
      return;
    }

    try {
      await respondMutation.mutateAsync({ id: reviewId, response: text });
      toast.success('Gửi phản hồi thành công');
      setResponseTexts(prev => ({ ...prev, [reviewId]: '' }));
    } catch (error) {
      // Error handled by mutation/api interceptor
    }
  };

  const filteredReviews = reviews?.filter(r => {
    if (filter === 'unreplied') return !r.doctorResponse;
    if (filter === 'replied') return !!r.doctorResponse;
    return true;
  });

  const averageRating = reviews?.length 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader 
        title="Đánh giá của bệnh nhân" 
        subtitle="Quản lý và phản hồi các nhận xét từ bệnh nhân của bạn"
      />

      {/* Summary Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-50/50 border-blue-100 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Điểm trung bình</p>
                <p className="text-2xl font-bold text-blue-900">{averageRating}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50/50 border-green-100 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Tổng đánh giá</p>
                <p className="text-2xl font-bold text-green-900">{reviews?.length ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50/50 border-amber-100 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Reply className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-600">Chờ phản hồi</p>
                <p className="text-2xl font-bold text-amber-900">
                  {reviews?.filter(r => !r.doctorResponse).length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-gray-100 w-fit p-1 rounded-lg">
        <Button 
          variant={filter === 'all' ? 'secondary' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-white shadow-sm' : ''}
        >
          Tất cả
        </Button>
        <Button 
          variant={filter === 'unreplied' ? 'secondary' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('unreplied')}
          className={filter === 'unreplied' ? 'bg-white shadow-sm' : ''}
        >
          Chưa phản hồi
        </Button>
        <Button 
          variant={filter === 'replied' ? 'secondary' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('replied')}
          className={filter === 'replied' ? 'bg-white shadow-sm' : ''}
        >
          Đã phản hồi
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : filteredReviews?.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Không tìm thấy đánh giá nào</p>
          </div>
        ) : (
          filteredReviews?.map((review) => (
            <Card key={review.id} className="border shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-blue-50">
                    <AvatarImage src={review.reviewerAvatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900">
                        {review.isAnonymous ? 'Người dùng ẩn danh' : (review.reviewerName || 'Bệnh nhân')}
                      </h4>
                      <Badge variant="outline" className="text-[10px] font-bold tracking-widest px-1.5 h-4 uppercase">
                        {review.appointmentNumber || 'Lịch hẹn'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-2 font-medium">
                        {format(new Date(review.createdAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                      </span>
                    </div>
                  </div>
                </div>
                {review.doctorResponse && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Đã phản hồi
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm bg-gray-50/50 p-3 rounded-lg border border-gray-100 italic">
                  "{review.comment}"
                </p>

                {review.doctorResponse ? (
                  <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <div className="flex items-center gap-2 mb-2">
                      <Reply className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Phản hồi của bạn</span>
                    </div>
                    <p className="text-sm text-blue-900 leading-relaxed">{review.doctorResponse}</p>
                    <p className="text-[10px] text-blue-400 mt-2 flex items-center gap-1 leading-none">
                      <Clock className="h-3 w-3" />
                      {review.responseAt && format(new Date(review.responseAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <Textarea 
                      placeholder="Nhập nội dung phản hồi cho bệnh nhân..."
                      className="resize-none border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                      value={responseTexts[review.id] || ''}
                      onChange={(e) => handleResponseChange(review.id, e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
                        onClick={() => handleSubmitResponse(review.id)}
                        disabled={respondMutation.isPending}
                      >
                        {respondMutation.isPending ? 'Đang gửi...' : 'Gửi phản hồi'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
