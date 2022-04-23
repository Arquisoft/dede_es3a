import {getSolidDataset,getThing,getStringNoLocale,Thing,getUrl} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/lit-generated-vocab-common";
import React, {useEffect} from "react";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
type Props_POD = {
    webId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex', 
      flexWrap: 'wrap',
      width: '60%',
      height:'60%',
      marginTop:'10%',
      marginLeft:'30%',
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    margen:{
      margin: '-25px 0 0 -25px',
      marginRight:'30%',
      marginTop: theme.spacing(20),
      display: 'flex',
      justifyContent:'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10),
      width: '70%',
      height:''
    },
  })
);
function FinishBuying(){
    if(JSON.parse(sessionStorage.getItem('cart') as string).length > 0){
      sessionStorage.setItem('cart', JSON.stringify([]));
      alert("Compra realizada");
    }
  }
async function userAddress(): Promise<string> {
    let web=sessionStorage.getItem('webIdSesion') as string
    let profileDocumentURI = web.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, sessionStorage.getItem('webIdSesion')as string)
    let hasAddress = getUrl(profile as Thing, VCARD.hasAddress) as string
    let addressUser = await getThing(myDataSet, hasAddress)

    let street_address= getStringNoLocale(addressUser as Thing, VCARD.street_address) as string
    let locality= getStringNoLocale(addressUser as Thing, VCARD.locality) as string
    let postal_code= getStringNoLocale(addressUser as Thing, VCARD.postal_code) as string
    let region= getStringNoLocale(addressUser as Thing, VCARD.region) as string
    let country= getStringNoLocale(addressUser as Thing, VCARD.country_name) as string;
    let address = street_address+" "+ locality+ " "+postal_code+" "+region+" " + country;
    return address;
  }

function GastosEnvio(): JSX.Element {
    const classes = useStyles();
    const [address, setAddress] = React.useState<string>("");
    const getAddress = async () => setAddress(await userAddress())

    useEffect(() => {
        getAddress();
    });
    
  function coordenadas(){
    const axios = require("axios");
    return axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
          ".json?access_token=" + "pk.eyJ1IjoidW8yNzE0NDciLCJhIjoiY2wyN2MxdDdwMHMxcTNkbnAyd2x3ajFpaiJ9.4meULCmzm3oog7dC-22EvQ"
      )
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        return error;
      });
  }
  function distancias(){
    if(address !== ""){
      const coord= coordenadas();
      var latitudAlmacen =43.354805679135595
      var longitudAlmacen= -5.8513295460816295
      let lat = coord.features[0].geometry.coordinates[1];
      let lon = coord.features[0].geometry.coordinates[0];
      var difLatitud=latitudAlmacen-lat;
      var difLong=longitudAlmacen-lon;
      var constante = (Math.PI/180)
      var a = Math.sin(difLatitud*constante/2)^2 + Math.cos(latitudAlmacen)*Math.cos(lat)* Math.sin(difLong*constante/2)^2
      var dist=2*Math.asin( Math.sqrt(a));
      
      return Math.round(dist*0.3*100)/100
    }
    else return 0;
  }
  function calcularValorGastosdeEnvío(address: string){
    var x=0
    x= Number(sessionStorage.getItem('precioCarrito'));
    var d= distancias();
    return x+d;
  }

    return (
        <Container>
          <div className={classes.margen}>
              <Card>
                  <Typography variant='h5'>
                      Precio total + Gastos de envío ({distancias()}): {calcularValorGastosdeEnvío(address)}
                  </Typography>
              </Card>

              <Button variant="contained" endIcon={<ShoppingCartIcon />}  size='large' onClick={FinishBuying} href='http://localhost:3000'>
                  Finalizar Compra
              </Button>
          </div>
      </Container>
    );
  }
export default GastosEnvio;