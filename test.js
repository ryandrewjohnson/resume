/*
const fs = require('fs');
const pdf = require('html-pdf');

const html = fs.readFileSync('./dist/index.html', 'utf8');
const options = { 
  base: './dist', 
  format: 'Letter',
  orientation: 'portrait',
  base: "file:////Users/ryanjohnson/projects/github/resume/dist/assets",
  //  border: {
  //   top: '2in',            // default is 0, units: mm, cm, in, px
  //   right: '1in',
  //   bottom: '2in',
  //   left: '1.5in'
  // },
  // zoomFactor: '2'
};

pdf.create(html, options).toFile('./resume.pdf', (err, res) => {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' } 
});
*/

var renderWebpage = require('render-webpage')

renderWebpage('http://localhost:8080/', 'resume.pdf', function (err) {
  if (err) throw err

  console.log('Success!')
})