import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from '../../App.js';


test('Test de rendereado de contenido', ()=>{
    const note = {
        content: 'Este es un test',
        important: true
    }

    const component = render(App);
    //console.log(component.container);
});