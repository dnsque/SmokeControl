import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Straipsniai apie rūkymą</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ArticleCard 
                    title="Rūkymo žala sveikatai" 
                    content="Rūkymas yra pagrindinė išvengiamų mirčių priežastis visame pasaulyje. Jis didina riziką susirgti plaučių vėžiu, širdies ir kraujagyslių ligomis bei lėtinėmis kvėpavimo takų ligomis."
                    imageSrc="https://placehold.co/600x400/png" 
                />
                
                <ArticleCard 
                    title="Metimo rūkyti privalumai" 
                    content="Po metimo rūkyti organizmas pradeda atsigauti jau per pirmąsias 20 minučių. Po kelių savaičių pagerėja kraujotaka ir plaučių funkcija, o po kelių metų ženkliai sumažėja rimtų ligų rizika."
                    imageSrc="https://placehold.co/600x400/png" 
                />
                
                <ArticleCard 
                    title="Būdai mesti rūkyti" 
                    content="Yra daug būdų mesti rūkyti, įskaitant nikotino pakaitinę terapiją, elgesio terapiją ir medikamentinį gydymą. Svarbu rasti metodą, kuris tinka būtent jums."
                    imageSrc="https://placehold.co/600x400/png" 
                />
                
                <ArticleCard 
                    title="Elektroninės cigaretės ir vipinimas" 
                    content="Nors elektroninės cigaretės gali būti mažiau kenksmingos nei tradicinės, jose vis tiek yra nikotino ir kitų potencialiai pavojingų medžiagų. Jų ilgalaikis poveikis sveikatai dar nėra visiškai ištirtas."
                    imageSrc="https://placehold.co/600x400/png" 
                />
                
                <ArticleCard 
                    title="Pasyvus rūkymas" 
                    content="Antrinio tabako dūmų įkvėpimas gali sukelti tas pačias sveikatos problemas kaip ir aktyvus rūkymas. Ypač pavojinga tai vaikams ir nėščioms moterims."
                    imageSrc="https://placehold.co/600x400/png" 
                />
                
                <ArticleCard 
                    title="Ekonominės rūkymo pasekmės" 
                    content="Be išlaidų cigaretėms, rūkaliai patiria papildomas išlaidas sveikatos priežiūrai, draudimui ir praranda uždarbį dėl su rūkymu susijusių ligų. Metimas rūkyti gali žymiai pagerinti finansinę padėtį."
                    imageSrc="https://placehold.co/600x400/png" 
                />
            </div>
            
            <div className="mt-8 text-center">
                <Link to="/account" className="btn btn-primary">
                    Eiti į paskyrą
                </Link>
            </div>
        </div>
    );
};

const ArticleCard: React.FC<{title: string, content: string, imageSrc: string}> = ({title, content, imageSrc}) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={imageSrc} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
                <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary">Skaityti daugiau</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;