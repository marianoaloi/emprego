import React from 'react';
import {
  SocialMediaContainer,
  SocialMediaTitle,
  SocialMediaGrid,
  SocialMediaItem,
  SocialMediaIcon,
  SocialMediaLink,
  SocialHidden
} from './SocialMedia.styled';

interface SocialMediaProps {
  hidden: boolean;
}


const SocialMedia : React.FC<SocialMediaProps> = ({ hidden = false }) => {
    
    const size = '24'
    const data = [
        { "name": "linkedin/maloi", "icon": `<svg fill="#000000" width="${size}px" height="${size}px" viewBox="-0 -0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-linkedin-circle"><path d='M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592 0-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842 0-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066 1.41 0 2.468.922 2.468 2.902zM6.213 5.271C5.48 5.271 5 5.753 5 6.385c0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144V8.38H5.127v6.447z'/><path d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z'/></svg>`, "url": "https://www.linkedin.com/in/maloi" },
        {
            "name": "github/marianoaloi", "icon": `<svg width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"  fill="#1B1F23"/>
</svg>`, "url": "https://github.com/marianoaloi"
        },
        { "name": "cloudskillsboost", "icon": `<svg width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#EA4335" d="M10.313 5.376l1.887-1.5-.332-.414a5.935 5.935 0 00-5.586-1.217 5.89 5.89 0 00-3.978 4.084c-.03.113.312-.098.463-.056l2.608-.428s.127-.124.201-.205c1.16-1.266 3.126-1.432 4.465-.354l.272.09z"/><path fill="#4285F4" d="M13.637 6.3a5.835 5.835 0 00-1.77-2.838l-1.83 1.82a3.226 3.226 0 011.193 2.564v.323c.9 0 1.63.725 1.63 1.62 0 .893-.73 1.619-1.63 1.619l-3.257-.003-.325.035v2.507l.325.053h3.257a4.234 4.234 0 004.08-2.962A4.199 4.199 0 0013.636 6.3z"/><path fill="#34A853" d="M4.711 13.999H7.97v-2.594H4.71c-.232 0-.461-.066-.672-.161l-.458.14-1.313 1.297-.114.447a4.254 4.254 0 002.557.87z"/><path fill="#FBBC05" d="M4.711 5.572A4.234 4.234 0 00.721 8.44a4.206 4.206 0 001.433 4.688l1.89-1.884a1.617 1.617 0 01.44-3.079 1.63 1.63 0 011.714.936l1.89-1.878A4.24 4.24 0 004.71 5.572z"/></svg>`, "url": "https://www.cloudskillsboost.google/public_profiles/9f110682-e4ec-4bbc-82f4-7b987dd66ace" }

    ]
    return (
        <SocialMediaContainer>
            <SocialMediaTitle>Social Media</SocialMediaTitle>
            <SocialMediaGrid>
                { !hidden &&
                    data.map((sm, index) => (
                    <SocialMediaItem key={index}>
                        <SocialMediaIcon dangerouslySetInnerHTML={{ __html: sm.icon }} />
                        <SocialMediaLink href={sm.url}>
                            {sm.name}
                        </SocialMediaLink>
                    </SocialMediaItem>
                ))}
                
            { hidden &&
                    data.map((sm, index) => (<SocialHidden 
            key={index}  >{sm.url}</SocialHidden>))}
            </SocialMediaGrid>
        </SocialMediaContainer>
    )
}

export default SocialMedia;