

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input, MenuItem, Select } from '@mui/material';
import avatarImg from  './../../../assets/user-avatar.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const EditContact = (props) => {
    const [state, setState] = useState({ isWhatsapp: false, type: "personal" });
    const [imageUpload, setImageUpload] = useState({});
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const router = useRouter();
    // const { id } = router.query;
    const path = router.asPath['id'];
    console.log('router', props);

    useEffect(() => {
        let prevContactList = localStorage.getItem("contactList")
          ? JSON.parse(localStorage.getItem("contactList"))
          : [];
    
        // let foundData = prevContactList.filter(
        //   (el) => el.name === router
        // );
        // setState(foundData[0]);
    
      }, []);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
            let name = data.get('name');
            let contactNumber = data.get('contactNumber');
            let type = data.get('contactNumber');
            let isWhatsapp = data.get('isWhatsapp');


            if (contactNumber.length <1 ) return;
            if (imageUpload == null || imageUpload == "") {
              alert("Select image to upload.");
              return;
            };

            const newData = {
                name: data.get('name'),
                contactNumber: data.get('contactNumber'),
                type: data.get('contactNumber'),
                isWhatsapp: data.get('isWhatsapp'),
            }

            uploadImage(name);
            let prevContactList = localStorage.getItem("contactList") ?  JSON.parse(localStorage.getItem("contactList")) : [];
            localStorage.setItem("contactList", JSON.stringify([...prevContactList, newData]));
    };

    let uploadImage = (name) => {
        // try {
          const imageRef = ref(storage, `images/${name}`);
          uploadBytes(imageRef, imageUpload)
          // setImageUpload(null)
          .then(() => {
            getDownloadURL(imageRef).then(url => {
              setUploadedImageUrl(url);
                alert("Image uploaded successfully");
              setTimeout(()=>{
    
                navigate('/')
              },7000)
    
            }).catch(error => console.error(error))
          }).catch(error => console.error(error))
        // } catch (error) {
          // console.error(error);
        // }
      };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{background: 'white'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            paddingTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
 
          <Typography component="h1" variant="h5" sx={{color: 'black !important'}}>
            Update contact details
          </Typography>

          <input
              type="file"
              //  size={'<1024kb'}
              accept="image/png, image/jpeg"
              name="avatar"
              id="actual-btn"
              hidden
              // value={imageUpload}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
            <label htmlFor="actual-btn">
              <Image 
                style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '90px'
                }}  
                src={avatarImg} alt="user image" />
            </label>


          {/* <Input */}
            // type='file' 
            // accept="image/png, image/jpeg"
            // hidden
            // id='uploadIn=mg'
            {/* // value={imageUpload} '// */}
            // onChange={(e) => setImageUpload(e.target.files[0])}
        {/* //   /> */}
          {/* <Avatar  src={avatarImg} alt="user image" sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            {/* <LockOutlinedIcon /> */}
            {/* <Image src={  avatar} alt="user image" /> */}
          {/* </Avatar> */}


          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                  type='number'
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                    required
                    fullWidth
                    labelId="Select contact type"
                    id="type"
                    //   value={type}
                    label="Select"
                    name='type'
                //   onChange={handleChange}
                    >
                    <MenuItem value={'personal'}>Personal</MenuItem>
                    <MenuItem value={'office'}>Office</MenuItem>
                </Select>

              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                name='isWhatsapp'
                sx={{color: 'black !important'}}
                  control={<Checkbox value="true" color="primary" />}
                  label="Is whatsApp available for this number."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update contact
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default EditContact;