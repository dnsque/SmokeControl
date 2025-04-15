import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '../forms/LoginForm';
import GoogleLoginForm from '../forms/GoogleLoginForm';

const LoginPage: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>SmokeControl - Prisijungimas</title>
                <meta name="description" content="Prisijunkite prie savo SmokeControl paskyros" />
            </Helmet>
            <article className="prose prose-slate text-center">
                <h1>Sveiki atvykę į Smoke Control!</h1>
                <p>Sužinok, kiek sutaupei, atsisakęs rūkymo!</p>
                <LoginForm />
                <div className='flex flex-col p-0 justify-center items-center'>
                    <a className="btn btn-link" href="/register">Užsiregistruoti</a>
                    <span className='text-sm'>arba</span>
                    <GoogleLoginForm />
                </div>
            </article>
        </div>
    );
};

export default LoginPage;