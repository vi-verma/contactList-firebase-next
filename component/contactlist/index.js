import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import whatsappImage from "./../../assets/WhatsApp.svg";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteForever, HomeRepairServiceOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const ContactCard = (props) => {
  let deleteContact = props.deleteContact || (()=>{});
  let contactNumber = props?.detail?.contactNumber || "";
  let isWhatsapp = props?.detail?.isWhatsapp || "";
  let name = props?.detail?.name || "";
  let type = props?.detail?.type || "";
  let url = props?.detail?.url ? props?.detail?.url+'&width=120' : "";
  const router = useRouter();

  return (
    <Box sx={{ width: "64vw", minWidth: "300px", marginBottom: "12px" }}>
      <Card
        sx={{
          background: "var(--card-backgeound)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        variant="outlined"
      >
        <React.Fragment>
          <CardContent>
            <Avatar
              alt="Remy Sharp"
              src={url || PersonIcon}
              sx={{ width: 56, height: 56 }}
            />
          </CardContent>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              Name: {name || "--"}
            </Typography>
            <Typography sx={{ fontSize: 14 }} component="div">
              Contact No. : {contactNumber || "--"}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              Contact type : {type || "--"}
            </Typography>
            <Typography>
              {isWhatsapp && "Message "}
              {isWhatsapp && (
                <Image
                  src={whatsappImage}
                  style={{ height: "12px", width: "12px" }}
                  alt="wa icon"
                />
              )}
            </Typography>
          </CardContent>
          <CardContent>
            <Button>
              <EditIcon
                onClick={() => router.push(`/edit-contact?name=${name}`)}
                sx={{ color: "green", fontSize: "30px" }}
              />
            </Button>
            <Button onClick={() => deleteContact(name)}>
              <DeleteForever sx={{ color: "red", fontSize: "30px" }} />
            </Button>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default ContactCard;
