import { PersonPinCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import whatsappImage from "./../../../assets/WhatsApp.svg";


const ContactDetailById = () => {
  return (
    <div>
      <Box
        sx={{
          width: "64vw",
          minWidth: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Card
          sx={{
            background: "var(--card-backgeound)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            width: "60vw",
            marginTop: "10%",
          }}
          variant="outlined"
        >
          <CardContent>
            <Avatar
              alt="Remy Sharp"
              src={PersonPinCircleOutlined}
              sx={{ width: 56, height: 56 }}
            />
          </CardContent>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              name: {"name" || "name"}
            </Typography>
            <Typography sx={{ fontSize: 14 }} component="div">
              Contact No. : {"contactNumber" || "12347890"}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              Contact type : {"type" || "personal"}
            </Typography>
            <Typography>
              {
                // "isWhatsapp" &&
                <Image
                  src={whatsappImage}
                  style={{ height: "25px", width: "25px" }}
                  alt="wa icon"
                />
              }
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ContactDetailById;
