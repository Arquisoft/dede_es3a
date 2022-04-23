import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, CardHeader, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import Nav from '../Fragments/Nav';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GetAddressPod from "../POD/GetAddressPod";

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

const ProfileViewer = () => {
  const classes = useStyles();
  const { session } = useSession();
  const { webId } = session.info;
  function guardarWebId(){
    sessionStorage.setItem('webIdSesion', webId as string);
    const w= sessionStorage.getItem('webIdSesion');
  }

  return (
    <><Nav />
    <form className={classes.container} noValidate autoComplete="on">
    <Container fixed>
      {session.info.webId ? (
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}>
          <Card className={classes.card}>
          <CardHeader className={classes.header} title="User" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <Text property={FOAF.name.iri.value} />
              </Typography>
            </CardContent>
            <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
            <GetAddressPod  webId = { session.info.webId }/>
            </CardActionArea>
          </Card>
        </CombinedDataProvider>
      ) : null}
      <LogoutButton>
        <Button style={{ marginTop: 20 }} variant="contained" color="primary" href="/FormLogIn">
          Logout
        </Button>
      </LogoutButton>
        <Button style={{ marginTop: 20 }} variant="contained" color="primary" href="/GastosEnvio" onClick={guardarWebId}>
          Continuar con su compra 
        </Button>

    </Container>
    </form></>
  );
}

export default ProfileViewer


