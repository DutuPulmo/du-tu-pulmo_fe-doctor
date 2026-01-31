import { PageHeader } from '@/components/layout/PageHeader';

export const HelpPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Hướng dẫn sử dụng"
                subtitle="Tài liệu hướng dẫn và câu hỏi thường gặp"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default HelpPage;
