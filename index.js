import express from 'express';
import axios from 'axios';
import validateProverb from './validate.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) =>{
    try {
        const response = await axios.get('https://proverbs-api-4ukw.onrender.com/proverbs');
        res.render('index', {
            proverbs: response.data,
            success: req.query.success || null,
            error: req.query.error || null
        });
    }
    catch (err) {
        console.error(err);
    res.render('index', { 
      proverbs: [], 
      success: null, 
      error: 'Unable to load proverbs. Try again.'});
    }
});

app.get('/proverbs/:id', async (req, res) => {
    try {
      const response = await axios.get(`https://proverbs-api-4ukw.onrender.com/proverbs/${req.params.id}`);
      res.render('show', { 
          proverb: response.data, 
          success: req.query.success || null, 
          error: req.query.error || null
      });
    } catch (error) {
      console.error(error);
      res.redirect('/?error=' + encodeURIComponent('Error fetching proverb.'));
    }
  });
  

app.get('/new', (req, res) => {
    res.render('new', { 
      success: req.query.success || null, 
      error: req.query.error || null ,
      proverb: {}
    });
  });


app.post('/proverbs', validateProverb, async (req,res) => {
    try {
        if (req.validated) {
        await axios.post('https://proverbs-api-4ukw.onrender.com/proverbs', req.body);
        res.redirect('/?success=' + encodeURIComponent('New proverb created successfully!'));
        } else {
            res.render('new', {
                error: req.validationError,
                proverb: req.body,
                success: null
              });
        }
    } catch (err) {
        console.error(err);
        res.render('new', {
            error: 'Error creating proverb. Try again.',
            proverb: req.body,
            success: null
          });
    }
});

app.get('/proverbs/:id/edit', async (req, res) => {
    try {
      const response = await axios.get(`https://proverbs-api-4ukw.onrender.com/proverbs/${req.params.id}`);
      console.log('Proverb ID:', response.data.id);
      res.render('edit', { 
        proverb: response.data,
        success: req.query.success || null,
        error: req.query.error || null
      });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  });
  

  app.post('/proverbs/:id/edit', validateProverb, async (req, res) => {
    try {
        if (req.validated) {
      await axios.put(`https://proverbs-api-4ukw.onrender.com/proverbs/${req.params.id}`, req.body);
      res.redirect(`/proverbs/${req.params.id}?success=` + encodeURIComponent('Proverb updated successfully!'));
        } else {
            res.render('edit', { 
                proverb: { ...req.body, id: req.params.id },  
                error: req.validationError, 
                success: null
              });
        }
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        res.redirect(`/proverbs/${req.params.id}/edit?error=` + encodeURIComponent('Error updating proverb. Try again.'));
    }
  });
  

app.post('/proverbs/:id/delete', async (req,res) => {
    try {
        await axios.delete(`https://proverbs-api-4ukw.onrender.com/proverbs/${req.params.id}`);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect(`/proverbs/${req.params.id}`);
    }
});

app.get('/random', async (req,res) => {
    try {
        const { data } = await axios.get('https://proverbs-api-4ukw.onrender.com/proverbs/random');
        res.render('show', { proverb: data });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}`);
});