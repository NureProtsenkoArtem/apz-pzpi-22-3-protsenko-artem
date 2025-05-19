import React from 'react';
import { useTranslation } from 'react-i18next';
import { LangButton, Switcher } from './language-switch.style';



export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Switcher>
            <LangButton active={currentLang === 'ua'} onClick={() => changeLanguage('ua')}>
                UA
            </LangButton>
            <LangButton active={currentLang === 'en'} onClick={() => changeLanguage('en')}>
                EN
            </LangButton>
        </Switcher>
    );
};
