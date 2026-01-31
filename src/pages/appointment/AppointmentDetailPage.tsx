import { PageHeader } from '@/components/layout/PageHeader';
import { useParams } from 'react-router-dom';

export const AppointmentDetailPage = () => {
    const { id } = useParams();

    return (
        <div className="space-y-6">
            <PageHeader
                title="Chi tiết lịch hẹn"
                subtitle="Thông tin chi tiết lịch hẹn khám"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang chi tiết lịch hẹn (ID: {id}) đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default AppointmentDetailPage;
