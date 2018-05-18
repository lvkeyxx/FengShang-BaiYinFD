package com.utility;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import org.apache.commons.lang.time.FastDateFormat;

import java.util.Date;

/**
 *
 * @author 
 */
public class TokenUtils {
 
    private static final String privateKey = "sunbing&bmzs&sdicpower20161213211558";
 
    public static String getToken(String password, String date) {
        return Hashing.md5().newHasher().
                putString(password, Charsets.UTF_8).
                putString(privateKey, Charsets.UTF_8).
                putString(date, Charsets.UTF_8).hash().toString();
    }
 
     
    public static String getToken(String password, Date date) {
        return Hashing.md5().newHasher().
                putString(password, Charsets.UTF_8).
                putString(privateKey, Charsets.UTF_8).
                putString(getDate(date), Charsets.UTF_8).hash().toString();
    }
 
     
    public static String getToken(String password) {
        return Hashing.md5().newHasher().
                putString(password, Charsets.UTF_8).
                putString(privateKey, Charsets.UTF_8).putString(getDate(), Charsets.UTF_8).hash().toString();
 
    }
 
    public static boolean validToken(String token, String password) {
        String confirm = getToken(password);
        if (confirm.equals(token)) {
            return true;
        } else {
            return false;
        }
    }
 
    public static String getDate() {
        Date date = new Date(System.currentTimeMillis());
        return FastDateFormat.getInstance("yyyyMMddHH").format(date);
 
    }
    public static String getDate(Date now) {
       
        return FastDateFormat.getInstance("yyyyMMddHH").format(now);
 
    }
     public static String getNextHour(Date now) {
        Date date = new Date(now.getTime()+60*60*1000);
         
        return FastDateFormat.getInstance("yyyyMMddHH").format(date);
 
    }
     public static String makeToken(String feed) {
			Date now = new Date(System.currentTimeMillis());
			String signToken = TokenUtils.getToken(feed, now);
			String nextToken = TokenUtils.getToken(feed, TokenUtils.getNextHour(now));
		    return signToken+nextToken;
     }
     public static boolean checkToken(String feed,String token) {
//    	 return true;
    	 String signToken=token.substring(0,token.length()/2);
    	 String nextToken=token.substring(token.length()/2,token.length());
    	 return (TokenUtils.validToken(signToken, feed) || TokenUtils.validToken(nextToken, feed));
     }    
     
     public static String makeMD5ForBizKey(String bizKey) {
         return Hashing.md5().newHasher().
                 putString(bizKey, Charsets.UTF_8).
                 putString(privateKey, Charsets.UTF_8).hash().toString();
     }
}
