

let lists;
let users;
export class AirbnbDAO
{

   static async injectDBUsers(conn)
   {
    if(users)
    return users;
    try {
        users = await conn.db(process.env.AIRBNB_NS || "sample_airbnb").collection("Users");
        console.log("connected users collection successfully");
        return users;
    } catch (e) {
        console.error(`unable to establish a collection handle in restaurantsDAO for user: ${e}`);
    }
   }

    static async injectDB(conn)
    {
        if(lists)
        return lists;
        try{
        lists = await conn.db(process.env.AIRBNB_NS).collection("listingsAndReviews");
        return lists;
         }catch(e)
         {
             console.error(`unable to establish a collection handle in restaurantsDAO: ${e}`);
         }
    }

    static async getAllLists()
    {
        const findResult = await lists.find({}).limit(150).toArray();
        return findResult;
    }

    static async getItemById(id)
    {
        let query = {_id : id};
        const findResult = await lists.find(query).toArray();
        return findResult;
    }

    static async getListByPropertyType(type)
    {
        let query = {property_type : {$regex : type, $options: "i"}}
        const findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getListByPrice(price)
    {
        let query = {price : {$lte : price}}
        const findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getByCountry(country)
    {
        let query = {"address.country" : {$regex : country, $options : "i"}};
        let findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getByPrice_Type(price, type)
    {
        let query = {$and : [{price : {$lte : price}}, {property_type : {$regex : type, $options: "i"}}]} ;
        const findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getByPrice_Country(price, country)
    {
        let query = {$and : [{price : {$lte : price}}, {"address.country" : {$regex : country, $options : "i"}}]};
        let findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getbyType_Country(type, country)
    {
        let query = {$and : [{property_type : {$regex : type, $options : "i"}},{"address.country" : {$regex : country, $options : "i"}}]};
        let findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getbyPrice_Type_Country(price, type, country)
    {
        let query = {$and : [{price : {$lte : price}},{property_type : {$regex : type, $options : "i"}},{"address.country" : {$regex : country, $options : "i"}}]};
        let findResult = await lists.find(query).limit(150).toArray();
        return findResult;
    }

    static async getUniqueID()
    {
        let unique_id = await users.find({key : "counter"}, {"key" : 0}).toArray();
        return unique_id[0].counter;
    }

   static async addUser(fname, lname, email, password)
   {
       let id = await this.getUniqueID();
       let query = {id : id, first_name : fname, last_name : lname, email : email, password : password};
       let result = await users.insertOne(query);
       console.log("result for inserting:" , result);
       result = await users.updateOne({key : "counter"}, {$inc : {counter : 1}});
       console.log("result for updataing unique id:" , result);
   }
}


