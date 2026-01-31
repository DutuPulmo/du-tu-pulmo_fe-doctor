import { PageHeader } from '@/components/layout/PageHeader';

export const TodaySchedulePage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Lịch khám hôm nay"
                subtitle="Danh sách bệnh nhân đăng ký khám trong ngày"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default TodaySchedulePage;
