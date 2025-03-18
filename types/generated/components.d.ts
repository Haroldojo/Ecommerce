import type { Schema, Struct } from '@strapi/strapi';

export interface FooterPageFooterLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_page_footer_links';
  info: {
    displayName: 'footerLinks';
  };
  attributes: {
    bottomlinks: Schema.Attribute.Component<'global.links', true>;
    mainTitle: Schema.Attribute.String;
  };
}

export interface GlobalButton extends Struct.ComponentSchema {
  collectionName: 'components_global_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    slug: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface GlobalLinks extends Struct.ComponentSchema {
  collectionName: 'components_global_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    slug: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageHeroComponent extends Struct.ComponentSchema {
  collectionName: 'components_home_page_hero_components';
  info: {
    description: '';
    displayName: 'heroComponent';
  };
  attributes: {
    buyNowButton: Schema.Attribute.Component<'global.button', false>;
    heading: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    paragraph: Schema.Attribute.Text;
    tag: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer-page.footer-links': FooterPageFooterLinks;
      'global.button': GlobalButton;
      'global.links': GlobalLinks;
      'home-page.hero-component': HomePageHeroComponent;
    }
  }
}
