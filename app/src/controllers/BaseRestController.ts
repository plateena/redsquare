import express, { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
import { IBaseModel } from '../models/BaseModel';

/**
 * Base REST Controller for handling CRUD operations.
 * @template T - The Mongoose document type
 */
class BaseRestController<T> {
    /**
     * Creates an instance of BaseRestController.
     * @param {Model<T>} model - The Mongoose model to be used for CRUD operations.
     */
    constructor(private model: IBaseModel) {}

    /**
     * Retrieves all items from the collection.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves with the list of items.
     */
    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const items = await this.model.search({});
            res.json(items);
        } catch (err) {
            next(err);
        }
    };

    /**
     * Retrieves a single item by ID.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves with the retrieved item.
     */
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const item = await this.model.findById(req.params.id);
            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.json(item);
        } catch (err) {
            next(err);
        }
    };

    /**
     * Creates a new item.
     * @param {Request} req - The Express request object containing the item data.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves with the created item.
     */
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this.model.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    };

    /**
     * Updates an existing item by ID.
     * @param {Request} req - The Express request object containing the updated item data.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves with the updated item.
     */
    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.json(updatedItem);
        } catch (err) {
            next(err);
        }
    };

    /**
     * Deletes an item by ID.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves with a success message.
     */
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deletedItem = await this.model.findByIdAndDelete(req.params.id);
            if (!deletedItem) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.json({ message: 'Item deleted successfully' });
        } catch (err) {
            next(err);
        }
    };
}

export default BaseRestController;