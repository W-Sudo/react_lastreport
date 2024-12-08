import {useEffect,useState} from "react";

export default function App() {
    const [day,setDay] = useState("");
    const [month,setMonth]= useState("");
    const [nameday,setNameDay]=useState("");
    const [haveClick,setHaveClick]=useState(false);
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    useEffect(() => {
        (async()=>{
            const url = new URL(
                "https://nameday.abalin.net/api/V1/getdate"
            );
            
            const params = {
                "day": day,
                "month": month,
                "country": "gr",
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            try{
            const response=await fetch(url,{
            method: "GET",
            headers,
          });
          const data=await response.json();
          console.log("取得したデータ:", data);
          console.log("特定の属性：",data.nameday);
          if(data.nameday.gr==='n/a'){
            if(day === 31){
                setDay(1);
                setMonth(month=>(month === 12 ? 1 : month+1 ));
            }else{
                setDay(day=>day+1);
            }
          }else{
            setNameDay(data);
          }
        }catch(err){
            setDay(1);
            setMonth(month=>month+1);
        }
        })();
      },[day,month]);

    const handleSubmit=async(event)=>{
        event.preventDefault();
        const date_num=Number(event.target.elements.searchDate.value.replace(/\/+/g, ""));
        setDay(date_num%100);
        setMonth(Math.floor(date_num/100));
        setHaveClick(true);
    }
    return (
        <>
          <header>
            <h1>Nearest Name Day Search for Greece.</h1>
          </header>
          <div>
            <p>
                Name day（名前の日）とは、特定の名前を持つ人を祝う日であり、ヨーロッパなどで見られる文化です。
                このウェブサイトでは、日付を入力することによって、その日付に最も近いギリシャの名前の日の情報を表示します。
                </p> 
          </div>
          <div>
            <aside>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="searchDate">Enter Date:</label>
                  <input type="text" name="searchDate" placeholder="MM/DD"/>
                </div>
                <div>
                  <button type="submit">search</button>
                </div>
              </form>
            </aside>
            <main>
            {haveClick&&(
                <p>
                最も近い名前の日は{nameday.month}月{nameday.day}日です。{nameday.nameday.gr}という名前を祝います。
                </p>
              )
            }
              </main>
          </div>
          <footer>
            This Website is created by s5423061 Wataru Sudo by using <a href="https://nameday.abalin.net/">Nameday API</a>
            
          </footer>
        </>
      );

}
