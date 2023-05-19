import { styled } from '..';

export const MainContainer = styled('main', {
    display: 'flex',
    flexWrap: 'nowrap',
    //gap: '3rem',
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
    marginLeft: 'auto',
    height: 656  
});

export const CardProduct = styled('section', {
    borderRadius: 8,
    boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.9)',
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%);',
    position: 'relative',
    cursor: 'pointer',
    //padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    img: {
        objectFit: 'cover'
    },

    'footer': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        background: 'rgba(32, 32, 32, 0.9)',
        padding: '2rem',
        position: 'absolute',
        left: '0.25rem',
        right: '0.25rem',
        bottom: '0.25rem',
        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',
        
        'h2': {
            fontWeight: 700,
            fontSize: '$lg',
            lineHeight: '2rem',
            color: '$gray100'
        },

        'span': {
            fontWeight: 700,
            fontSize: '$xl',
            lineHeight: '2.125rem',
            color: '$green300'
        }
    },

    '&:hover': {
        'footer': {
            transform: 'translateY(0)',
            opacity: 1
        }
    }
});