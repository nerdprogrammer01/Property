import axios from "axios";

export const makeAPICall = apiData => {
    let {
        url,
        dispatch,
        defaultAction,
        successAction,
        failedAction,
        type,
        callback,
        errCallback,
        callbackData,
        extraData,
        headers,
        params = {}
    } = apiData;
    
    if (!url || url.indexOf("http://") === 1) {
        dispatch({
            type: null,
            payload: null
        });
        return Promise.reject();
    };

    let apiObj = {
        method: type ? type : "GET",
        // headers: {
        //     "Content-Type": "multipart/form-data; charset=utf-8;",
        //     Accept: '*/*'
        // },
    };

    if (defaultAction) {
        dispatch({
            type: defaultAction,
            payload: null
        })
    }

    if (type === "GET") {

    } else {
        apiObj.data = params;
        apiObj.method = "POST"
    }

    apiObj.url = url;

    // axios.interceptors.response.use(response => {
    //     return response.headers['content-type'] === 'application/json' ? response : Promise.reject(response);
    //   }, error => Promise.reject(error));
   //console.log("before>>"+JSON.stringify(apiObj))
    return axios(apiObj)
   
        .then(response => {
         console.log(">>"+JSON.stringify(apiObj))

            try {
                //console.log("resp>> "+JSON.stringify(response))
                response = response.data;
                  console.log("resp>> "+JSON.stringify(response))
                // if (response.status == 200) {status":1,"msg":"success"

                if (response.status == 200) {
                
                    if (successAction) {
                        dispatch({
                            type: successAction,
                            payload: response,
                            data: params,
                            params,
                            callbackData,
                            extraData
                        })
                    }
                    if (callback) {
                        callback(response, params)
               
                       
                    }
                }
                // else if( error.response.status === 401 && failedAction){
                //     dispatch({
                //         type: failedAction,
                //         payload: [],
                //         data: params,
                //         error: response
                //     }) 
                // }
                else {
                    if (failedAction) {
                        console.log("failedAction111",
                        )
                        dispatch({
                            type: failedAction,
                            payload: [],
                            data: params,
                            error: response
                        })
                    }
                    if (errCallback) {
                        errCallback(response, params)
                      
               
                    }
                }
            } catch (e) {
                if (failedAction) {
             
                    dispatch({
                        type: failedAction,
                        payload: [],
                        data: params,
                        error: e
                    })
                }
            }
        }
        )
        .catch((err) => {
           // let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
           if (errCallback) {
            errCallback(err, params)
        }
        console.log(failedAction)
            console.log("error", err);
          });
}