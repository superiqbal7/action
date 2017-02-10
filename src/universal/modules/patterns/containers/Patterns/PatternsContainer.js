import React from 'react';
import Helmet from 'react-helmet';
import InvoiceContainer from 'universal/modules/invoice/containers/InvoiceContainer/InvoiceContainer';
import IconAvatar from 'universal/components/IconAvatar/IconAvatar';
import Button from 'universal/components/Button/Button';

const rootStyle = {
  // margin: '0 auto',
  // maxWidth: '80rem',
  // padding: '2rem'
};

const PatternsContainer = () =>
  <div style={rootStyle}>
    <Helmet title="Welcome to the Action Pattern Library" />

    <h2>IconAvatar examples</h2>
    <IconAvatar colorPalette="mid" icon="bell" size="small" />
    <IconAvatar colorPalette="cool" icon="user" size="medium" />
    <IconAvatar colorPalette="warm" icon="credit-card" size="large" />

    <h2>Button variants</h2>
    <Button colorPalette="warm" icon="info-circle" label="Button" size="smallest" />
    <br/>
    <br/>
    <Button colorPalette="dark" icon="info-circle" label="Button" size="small" />
    <br/>
    <br/>
    <Button colorPalette="mid" icon="info-circle" label="Button" size="medium" />
    <br/>
    <br/>
    <Button colorPalette="cool" icon="info-circle" label="Button" size="large" />
    <br/>
    <br/>
    <Button colorPalette="gray" icon="info-circle" label="Button" size="largest" />

    <h2>Invoice presentation</h2>
    <InvoiceContainer />
  </div>;

export default PatternsContainer;
