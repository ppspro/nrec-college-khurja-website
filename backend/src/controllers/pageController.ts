import { Request, Response } from 'express';
import Page from '../models/Page';

export const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json({ success: true, pages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getPageByKey = async (req: Request, res: Response) => {
  try {
    const page = await Page.findOne({ key: req.params.key });
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.json({ success: true, page });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { title, bannerImage, bannerTitle, bannerSubtitle, sections, seoTitle, seoDescription, seoKeywords, ogImage, twitterCard, canonicalUrl, schemaJson } = req.body;
    let page = await Page.findOne({ key: req.params.key });

    if (!page) {
      page = await Page.create({
        key: req.params.key,
        title: title || req.params.key,
        bannerImage, bannerTitle, bannerSubtitle, sections, seoTitle, seoDescription, seoKeywords, ogImage, twitterCard, canonicalUrl, schemaJson
      });
    } else {
      if (title !== undefined) page.title = title;
      if (bannerImage !== undefined) page.bannerImage = bannerImage;
      if (bannerTitle !== undefined) page.bannerTitle = bannerTitle;
      if (bannerSubtitle !== undefined) page.bannerSubtitle = bannerSubtitle;
      if (sections !== undefined) page.sections = sections; // Array assignment
      if (seoTitle !== undefined) page.seoTitle = seoTitle;
      if (seoDescription !== undefined) page.seoDescription = seoDescription;
      if (seoKeywords !== undefined) page.seoKeywords = seoKeywords;
      if (ogImage !== undefined) page.ogImage = ogImage;
      if (twitterCard !== undefined) page.twitterCard = twitterCard;
      if (canonicalUrl !== undefined) page.canonicalUrl = canonicalUrl;
      if (schemaJson !== undefined) page.schemaJson = schemaJson;
      await page.save();
    }

    res.json({ success: true, page });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findOneAndDelete({ key: req.params.key });
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
