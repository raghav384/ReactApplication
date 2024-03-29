import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: '20%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

export default function RecipeReviewCard(props) {

   


  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
   
   
  <Card className={classes.root}>
      <CardHeader 
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
            
        //   </Avatar>
        //}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title= {props.dataToPass._id.medicine_name}
        subheader= {props.dataToPass._id.vendor_name}
                
        
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
  <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Price
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {props.dataToPass.medicine_price}
            </Typography>
          </Grid>
        </Grid>
        </CardContent>

        <CardContent>
         
        <Link to={{ pathname:`/redirect/newb`, 
                redirectUrl :  props.dataToPass.medicine_url , 
                redirectTime: "3000",
                destination_name: props.dataToPass._id.vendor_name ,
                destination_image_href: props.image_url}}> Link to Vendor Website </Link>
     
        </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
          <Typography paragraph>
            Description : {props.dataToPass.medicine_composition}         
          </Typography>
        
        </CardContent>
      </Collapse>
    </Card>
  );
}