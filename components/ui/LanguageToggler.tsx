import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

const availableLanguages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' }
];

export default function LanguageToggler() {
    const router = useRouter();
    const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        setCookie(null, 'NEXT_LOCALE', selectedLanguage, {
            maxAge: 30 * 24 * 60 * 60, // cookie will expire in 30 days
            path: '/' // cookie is valid for the entire domain
        });
        router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
            locale: selectedLanguage
        });
    };

    return (
        <select value={router.locale} onChange={handleChangeLanguage}>
            {availableLanguages.map((language) => (
                <option key={language.value} value={language.value}>
                    {language.label}
                </option>
            ))}
        </select>
    );
}
