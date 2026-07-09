import { Request, Response } from 'express';
import Menu from '../models/Menu';

export const getMenus = async (req: Request, res: Response) => {
  try {
    const menus = await Menu.find();
    res.json({ success: true, menus });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getMenuByKey = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findOne({ key: req.params.key });
    if (!menu) return res.status(404).json({ success: false, message: 'Menu not found' });
    res.json({ success: true, menu });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { name, items } = req.body;
    let menu = await Menu.findOne({ key: req.params.key });

    if (!menu) {
      menu = await Menu.create({ key: req.params.key, name, items });
    } else {
      if (name !== undefined) menu.name = name;
      if (items !== undefined) menu.items = items;
      await menu.save();
    }

    res.json({ success: true, menu });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
