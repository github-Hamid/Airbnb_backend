import { AirbnbDAO } from "../dao/airbnbDAO.js";

export default class AirbnbController
{
    static async apiGetAllLists(req, res, next)
    {
       try{ const list = await AirbnbDAO.getAllLists();
        if(list)
        res.status(200).json({list : list});
        else
        res.status(400).json({error : "List not found"});
        }catch(e)
        {
            console.log(`api, ${e}`);
            res.status(500).json({error : e});
        }
    }


    static async apiGetListById(req, res, next)
    {
        console.log(req.params.id)
        try {
            const id = req.params.id;
            console.log("param: ", id);
            const list = await AirbnbDAO.getItemById(id);
            if(list)
            res.status(200).json({list : list});
            else
            res.status(400).json({error : "List not found"});
        } catch (e) {
            console.log(`api filter by Id, ${e}`);
            res.status(500).json({error : e})
        }
    }


    static async apiGetListByType(req, res, next)
    {
        try {
            const type = req.params.type;
          
            const list = await AirbnbDAO.getListByPropertyType(type);
            if(list)
            res.status(200).json({list : list});
            else
            res.status(400).json({error: "List not found"});
        } catch (e) {
            console.log(`api filter by type, ${e}`);    
            res.status(500).json({error : e})        
        }
    }

    static async apiGetListByPrice(req, res, next)
    {
         try {
             const price =parseInt(req.params.price);
             const list = await AirbnbDAO.getListByPrice(price);
             console.log("list:", list[0].price);
             if(list)
             // getting the price from list -> parseFloat(list[0].price).toFixed(2)
             res.status(200).json({list : list});
            else
            res.status(400).json({error : e});
         } catch (e) {
            console.log(`api filter by price, ${e}`);    
            res.status(500).json({error : e}) 
         }
    }

    static async getListByPrice_Type(req, res, next)
    {
        try {
            let price = parseInt(req.query.price);
            let type = req.query.type;
            const list = await AirbnbDAO.getByPrice_Type(price, type);
            if(list)
             // getting the price from list -> parseFloat(list[0].price).toFixed(2)
             res.status(200).json({list : list});
            else
            res.status(400).json({error : e});
        } catch (e) {
           console.log(`api filter by price and type, ${e}`);    
           res.status(500).json({error : e}) 
        }
       
    }
}