import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input, MenuItem, Select } from "@mui/material";
import avatarImg from "./../../assets/user-avatar.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../firebase";
import LinearLoader from "../../component/loader/LinearLoader";

const theme = createTheme();

const EditContact = (props) => {
  const [state, setState] = useState({});
  const [imageUpload, setImageUpload] = useState({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [loading, setLoding] = useState(false);
  const router = useRouter();
  const quaryname = router.query.name;

  useEffect(() => {
    if (!quaryname) return;
    setLoding(true);
    const imageRef = ref(storage, `images/${quaryname}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setLoding(false);
        setUploadedImageUrl(url);
      })
      .catch((error) => console.error(error));
    let prevContactList = localStorage.getItem("contactList")
      ? JSON.parse(localStorage.getItem("contactList"))
      : [];

    let foundData = prevContactList.filter((el) => el.name === quaryname);
    setState(foundData[0]);
  }, []);

  const changeHandeler = (e) => {
    var inpkey = e.target.name;
    var value = e.target.value;
    if (inpkey === "isWhatsapp") {
      setState((prev) => ({ ...prev, isWhatsapp: e.target.checked }));
    } else {
      setState((prev) => ({ ...prev, [inpkey]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.contactNumber?.length !== 10) {
      alert("Contact number should be 10 digits number.");
      return;
    }

    uploadImage(quaryname);
    let prevContactList = localStorage.getItem("contactList")
      ? JSON.parse(localStorage.getItem("contactList"))
      : [];

    let foundDataIndex = prevContactList.findIndex(
      (el) => el.name === quaryname
    );
    prevContactList.splice(foundDataIndex, 1, state);
    localStorage.setItem("contactList", JSON.stringify([...prevContactList]));

    localStorage.setItem(
      "contactList",
      JSON.stringify([...prevContactList, state])
    );
  };

  let uploadImage = (quaryname) => {
    if (!imageUpload && state.name === quaryname) return;

    if (state.name !== quaryname || imageUpload) {
      const delimageRef = ref(storage, `images/${quaryname}`);
      deleteObject(delimageRef)
        .then(() => {
          // File deleted successfully
          console.log("img del");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.error(error);
        });

      const imageRef = ref(storage, `images/${state.name}`);
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUploadedImageUrl(url);
              alert("Image uploaded successfully");
              router.push("/");
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
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
          {
            loading && 
          <LinearLoader />
          }
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "black !important" }}
          >
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
                width: "140px",
                height: "140px",
                borderRadius: "90px",
              }}
              width={120}
              height={120}
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
                  id="name"
                  label="Name"
                  autoFocus
                  value={state.name}
                  disabled
                  onChange={changeHandeler}
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
                  value={state?.contactNumber}
                  onChange={changeHandeler}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required
                  fullWidth
                  id="type"
                  label="Select"
                  name="type"
                  key={state?.type}
                  defaultValue={state?.type}
                  onChange={changeHandeler}
                >
                  <MenuItem value={"personal"}>Personal</MenuItem>
                  <MenuItem value={"office"}>Office</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  name="isWhatsapp"
                  sx={{ color: "black !important" }}
                  control={
                    <Checkbox
                      key={state?.isWhatsapp}
                      checked={state?.isWhatsapp}
                      onClick={changeHandeler}
                      color="primary"
                    />
                  }
                  label="Is whatsApp availabel."
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
              Update contact
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditContact;
