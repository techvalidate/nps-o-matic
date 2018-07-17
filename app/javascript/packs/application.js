/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

document.addEventListener('DOMContentLoaded', () => {
    /* Implemented a method 'gradeColor' which Lightens/Darkens color (grades the color) based on the amount value*/
    const gradeColor = function(col, amt) {
        let usePound = false;
        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }
        const num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        let g = (num & 0x0000FF) + amt;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    };

    /* Implemented a function 'rgbify' for the meter based on ratings. The moreisgood flag toggles if higher values should be red or green.
    maxval and minval are the threshold values for your range. val is the value to be converted to rgb*/
    const rgbify = function(maxval, minval, val, moreisgood) {
        const intensity = (val - minval) / (maxval - minval);
        let r;
        let g;
        if (moreisgood) {
            if (intensity > 0.5) {
                g = 255;
                r = Math.round(2 * (1 - intensity) * 255);
            } else {
                r = 255;
                g = Math.round(2 * intensity * 255);
            }
        } else {
            if (intensity > 0.5) {
                r = 255;
                g = Math.round(2 * (1 - intensity) * 255);
            } else {
                g = 255;
                r = Math.round(2 * intensity * 255);
            }
        }
        return `rgb(${r.toString()}, ${g.toString()}, 0)`;
    };

    /* Set the gradient of rating scale*/
    const ratings = document.querySelectorAll('.new_rating button');
    let fading = 10;
    for (const node of ratings) {
        node.style.backgroundColor = gradeColor('#045EB0', fading);
        fading = fading + 7;
    }

    /* Implemented 'styleMeter' function which rotates the SVG elements based on the no. of ratings*/
    const styleMeter = function() {
        const deg = parseInt(document.getElementById('SVGText').textContent);
        const meter = document.querySelector('.svg__dial');
        meter.style.transform = `rotate(${deg}deg)`;

        /* Made the Circle & arrow pointer separate elements so that the components are reusable. Also calling 'rgbify' to change color of meter
         * based on the degree */
        const arrow = document.querySelector('.meter__dial--arrow');
        const circle = document.querySelector('.meter__dial--circle');
        const col = rgbify(100, -100, deg, true);
        arrow.style.fill = col;
        circle.style.fill = col;
    };

    styleMeter();

    /* Implemented a method called "include" via which we can load JS libs safely. */
    const include = function(filename, onload) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (script.readyState) {
                if (script.readyState === 'complete' || script.readyState === 'loaded') {
                    script.onreadystatechange = null;
                    onload();
                }
            } else {
                onload();
            }
        };
        head.appendChild(script);
    };

    /* Loading jQuery via the include method. Wanted to show proficiency using jQuery & ajax. Implemented ajax so that on a button click there
    *  is a POST call to server & no full page reload. Only the ratings part is reloaded with the new data*/
    include('https://code.jquery.com/jquery-3.3.1.min.js', () => {
        $('.ratings__submit').click((e) => {
            const txt = e.target.innerHTML;
            $.post('/ratings', { rating: { score: txt }}, (result) => {
                $('.right').html(result);
                styleMeter();
            }, 'html');
        });
    });
});
