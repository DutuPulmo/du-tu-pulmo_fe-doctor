import { PageHeader } from '@/components/layout/PageHeader';

export const VideoWaitingPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Phòng chờ Video"
                subtitle="Danh sách bệnh nhân đang chờ tư vấn video"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default VideoWaitingPage;
