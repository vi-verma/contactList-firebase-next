import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, Input, InputLabel, MenuItem, Select } from "@mui/material";
import avatarImg from "../../assets/user-avatar.jpg";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useRouter } from "next/router";
import LinearLoader from "../../component/loader/LinearLoader";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const AddContact = () => {
  const [state, setState] = useState({ isWhatsapp: false, type: "personal" });
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setloading] = useState(false);

  const route = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    let prevContactList = localStorage.getItem("contactList")
      ? JSON.parse(localStorage.getItem("contactList"))
      : [];

    const data = new FormData(event.currentTarget);
    let name = data.get("name");
    let contactNumber = data.get("contactNumber");
    let type = data.get("type");
    let isWhatsapp = data.get("isWhatsapp");

    if (!name.length) {
      alert("Enter name");
      return;
    };

    if (contactNumber.length !== 10) {
      alert("Contacl number should be of 10 digits.");
      return;
    };
    if (!type) {
      alert("Select contact type.");
      return;
    };
    if (imageUpload == null || imageUpload == "") {
      alert("Select image to upload.");
      return;
    }
    if (prevContactList.find((el) => el.name === name)){
      alert("This name already exists.");
      return
    }

    const newData = {
      name,
      contactNumber,
      type,
      isWhatsapp,
    };
    uploadImage(name);
    localStorage.setItem(
      "contactList",
      JSON.stringify([...prevContactList, newData])
    );
  };

  let uploadImage = (name) => {
    setloading(true);
    const imageRef = ref(storage, `images/${name}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUploadedImageUrl(url);
            // alert("Image uploaded successfully");
            setloading(false);
            setTimeout(() => {
              route.push("/");
            }, 5000);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ background: "white" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            paddingTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading && <LinearLoader />}

          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "black !important" }}
          >
            Create Contact Details
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
              width={120}
              height={120}
              style={{
                borderRadius: "90px",
              }}
              src={uploadedImageUrl || avatarImg}
              alt="user image"
            />
          </label>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  //   value={type}
                  // label="Select"
                  name="type"
                  //   onChange={handleChange}
                >
                  <MenuItem value={"personal"}>Personal</MenuItem>
                  <MenuItem value={"office"}>Office</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  name="isWhatsapp"
                  sx={{ color: "black !important" }}
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
              disabled={loading}
            >
              Create contact
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default AddContact;
