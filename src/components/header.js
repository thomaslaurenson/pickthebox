import React from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Link,
} from "@material-ui/core"
import GitHubButton from "react-github-btn"

class Header extends React.Component {
  render() {

    return (
      <div>
        <Box display="flex" justifyContent="center" pt={3}>
          <Typography variant="h2" component="h2">
            <Box fontWeight="fontWeightBold" m={1}>
              Pick The Box
            </Box>
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" pt={3} pb={3} pr={8} pl={8}>
          <Typography variant="body1" component="p">
            This web app is a simple, 100% client-side application to help you pick a <Link href="https://www.hackthebox.eu" >Hack The Box</Link> machine based on your specified parameters! The <Link href="https://github.com/thomaslaurenson/pickthebox">source code is on GitHub</Link> if you want to review or submit a PR! If you want to support this project, a star on GitHub would be awesome! <GitHubButton href="https://github.com/thomaslaurenson/pickthebox" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-show-count="true" aria-label="Star thomaslaurenson/pickthebox on GitHub">Star</GitHubButton>
          </Typography>
        </Box>
      </div>
    );
  }
}

export default withStyles({ withTheme: true })(Header);
