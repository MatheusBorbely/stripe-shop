import { styled } from '..';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingTop: 120,
});

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)'
});