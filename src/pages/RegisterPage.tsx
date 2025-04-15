import React from 'react';
import { Helmet } from 'react-helmet';
import RegisterForm from '../forms/RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>SmokeControl - Registracija</title>
                <meta name="description" content="Užsiregistruokite ir pradėkite naudotis SmokeControl platforma" />
            </Helmet>
            <article className="prose prose-slate text-center">
            <h1>Uzsiregistruok!</h1>
            <p>Ir galesi naudotis musu platforma.</p>
            <RegisterForm />
            </article>
        </div>
    );
};

export default RegisterPage;