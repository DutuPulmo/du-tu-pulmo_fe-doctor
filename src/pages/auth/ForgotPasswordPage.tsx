import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Quên mật khẩu?</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <p className="text-center text-gray-500">Form này đang được xây dựng.</p>
                    <div className="text-center text-sm">
                        <Link to="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                            Quay lại trang đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
