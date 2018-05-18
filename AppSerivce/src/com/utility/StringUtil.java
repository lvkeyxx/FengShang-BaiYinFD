/**
 * 
 */
package com.utility;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

/**
 * @author wangyg
 * @date 2017-12-06 09:26:30
 * 字符串处理工具类
 */
public class StringUtil {
	private static Logger logger = Logger.getLogger(StringUtil.class);

	/**
	 * 字符串不为空
	 * @param str
	 * @return
	 */
	public static boolean isNotBlank(String str) {
		return StringUtils.isNotBlank(str);
	}
	/**
	 * 字符串为空
	 * @param str
	 * @return
	 */
	public static boolean isBlank(String str) {
		return StringUtils.isBlank(str);
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) {
	}
}
