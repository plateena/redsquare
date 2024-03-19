import vehicleFactory from '../factories/vehicleFactory'
import { faker } from '@faker-js/faker'
import maintenanceFactory from '../factories/maintenanceFactory'
import IVehicle from '../../src/models/Vehicle'
import IBaseModel from '../../src/models/BaseModel'
import './../setup-db'

const brandData = [
    {
        name: 'Acura',
        models: ['ILX', 'MDX', 'RDX', 'RLX', 'TLX'],
    },
    {
        name: 'Alfa Romeo',
        models: ['Giulia', 'Stelvio'],
    },
    {
        name: 'Audi',
        models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'],
    },
    {
        name: 'BMW',
        models: ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7'],
    },
    {
        name: 'Chevrolet',
        models: [
            'Blazer',
            'Camaro',
            'Colorado',
            'Equinox',
            'Impala',
            'Malibu',
            'Silverado',
            'Suburban',
            'Tahoe',
            'Traverse',
            'Trax',
        ],
    },
    {
        name: 'Ford',
        models: ['Bronco', 'Escape', 'Expedition', 'Explorer', 'F-150', 'F-250', 'F-350', 'Mustang', 'Ranger'],
    },
    {
        name: 'Honda',
        models: ['Accord', 'Civic', 'CR-V', 'Fit', 'HR-V', 'Odyssey', 'Pilot', 'Ridgeline'],
    },
    {
        name: 'Hyundai',
        models: ['Accent', 'Elantra', 'Kona', 'Palisade', 'Santa Fe', 'Sonata', 'Tucson', 'Veloster'],
    },
    {
        name: 'Jeep',
        models: ['Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'],
    },
    {
        name: 'Kia',
        models: ['Forte', 'Optima', 'Rio', 'Sedona', 'Sorento', 'Soul', 'Sportage', 'Stinger'],
    },
    {
        name: 'Lexus',
        models: ['ES', 'GS', 'GX', 'IS', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'],
    },
    {
        name: 'Mazda',
        models: ['CX-3', 'CX-30', 'CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'MX-5 Miata'],
    },
    {
        name: 'Mercedes-Benz',
        models: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'S-Class'],
    },
    {
        name: 'Nissan',
        models: [
            'Altima',
            'Armada',
            'Frontier',
            'Kicks',
            'Maxima',
            'Murano',
            'Pathfinder',
            'Rogue',
            'Sentra',
            'Titan',
            'Versa',
        ],
    },
    {
        name: 'Subaru',
        models: ['Ascent', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback'],
    },
    {
        name: 'Toyota',
        models: ['4Runner', 'Avalon', 'Camry', 'Corolla', 'Highlander', 'Prius', 'RAV4', 'Sienna', 'Tacoma', 'Tundra'],
    },
    {
        name: 'Volkswagen',
        models: ['Arteon', 'Atlas', 'Golf', 'Jetta', 'Passat', 'Tiguan'],
    },
    {
        name: 'Volvo',
        models: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90'],
    },
]

const colorData = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black',
    'White',
    'Silver',
    'Gray',
    'Orange',
    'Purple',
    'Brown',
    'Beige',
    'Champagne',
    'Gold',
    'Bronze',
    'Copper',
    'Maroon',
    'Turquoise',
    'Navy',
    'Teal',
    'Lime',
    'Pink',
    'Magenta',
    'Aqua',
    'Cream',
    'Charcoal',
    'Olive',
    'Burgundy',
    'Indigo',
    'Slate',
    'Pearl',
    'Metallic',
    'Matte',
    'Two-tone',
    'Custom',
]

;(async () => {
    const vehicles = await vehicleFactory
        .withState(async () => {
            let brand: { name: string; models: string[] } = faker.helpers.arrayElement(brandData) as {
                name: string
                models: string[]
            }
            let model: string = faker.helpers.arrayElement(brand.models)
            return {
                brand: brand.name,
                model: model,
                color: faker.helpers.arrayElement(colorData),
            } as Partial<typeof IBaseModel>
        })
        .count(10)
        .make() as unknown as any

    for (const vehicle of vehicles) {
        console.log(vehicle)
    }
})()

it('run gen-data', async () => {
    expect(1).toBe(1)
})