import React, { useState } from 'react';
import { register } from '../firebase/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false); 

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      await register(email, password, (path: string) => { window.location.href = path; });
    } catch (err: any) {
      setError('Įvyko klaida registruojant: ' + err.message); 
    }
  };
  

  return (
    <form className="flex flex-col gap-2 w-80 mx-auto p-4 bg-base-200 rounded-lg shadow-md" onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="El. paštas"
        className="input validator input-bordered w-full"
      />
      <div className="validator-hint hidden">Įveskite galiojantį el. pašto adresą</div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Slaptažodis"
        minLength={8}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Turi būti daugiau nei 8 simboliai, įskaitant skaičių, mažąją raidę, didžiąją raidę"
        className="input validator input-bordered w-full"
      />
      <p className="validator-hint hidden">
        Turi būti daugiau nei 8 simboliai, įskaitant
        <br />Bent vienas skaičius
        <br />Bent viena mažoji raidė
        <br />Bent viena didžioji raidė
      </p>

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder="Pakartokite slaptažodį"
        minLength={8}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Turi būti daugiau nei 8 simboliai, įskaitant skaičių, mažąją raidę, didžiąją raidę"
        className="input validator input-bordered w-full"
      />

      {passwordMismatch && <div className="text-red-500 mt-2">Slaptažodžiai nesutampa</div>}

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <button className="btn btn-primary" type="submit">Užsiregistruoti</button>
    </form>
  );
};

export default RegisterForm;
