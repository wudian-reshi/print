/**
 * 打印总单
 * @param element
 * @param success 打印成功调用success()
 * @param error 打印失败调用 error()
 */
function printCountData (element, success, error) {
    // 可以直接使用 LODOP
    LODOP.PRINT_INIT('12312');
    LODOP.ADD_PRINT_HTM(30,5,"100%","80%",element);
    LODOP.PRINT();
    console.log('====获取到的需要打印的元素====');
    console.log(element);
    console.log('===========================');
}

/**
 * 打印标签
 * @param data 标签数据
 * @param success 打印成功调用success()
 * @param error 打印失败调用 error()
 */
function printTags(data, success, error) {
    // 可以直接使用 LODOP
    for(var i =0;i<data.length;i++){
		
        var html = `
			<div id="print" style="padding-left: 3%;padding-right:  3%;">
				<img style="float:right;padding-top: 6%;width: 33%;padding-right: 6%;" src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADbCAYAAADgdjR9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB//SURBVHhe7Z0LrB1V9Yfx/UbRNhgSkIZajFEiteCLasCgYhEUkdhSwAdCEVRCqFQUIQgIigQKCIkFghVIBFNqJQWBtlBQHiIaKKItYrARykMBn/U1/r/ds85/3T1rZu9zzsy95967VvLL7LP3nP3+Zubevc6erQo3N7dWrQvZf//73+Lf//538c9//rP4xz/+4VL617/+1eml0TXGw6pP22IOMB/q7D//+U/ol82bN5t5TGYxbtq6kJHwxBNPFKtWrSp+/OMfFzfccEM4ivgs0nFV4fhcfY4VH59fF47P1edY8fH5deH4XHT//fd3eml0bdOmTSPq0Wu95bMVH5+vw3fddVeAqM4AbMOGDcXNN9/c/Z7kU5d3HI7P1edY8fH5deH4XH2OFR+fXxeOz9XnbNy4sdNLW6wLGVev1atXF1OnTi1e/vKXd/WKV7yiKx0Xp9el6TgtKz0Op9J0nJaVHodTaRJ31FFHdXppdG3lypXF1ltvbdZNf47TdJyWlR6H0Z577lm6GsfGFfv0008vpkyZ0lPedWk6TstKj8OpNB2nZaXH4VSajkNLly7t9NIW60JGp0EhJ2211VYupU996lOdXhpd++EPf1g897nPNevUpt7xjnckH5H/+te/FieffHLx0pe+1MxjMuuSSy7p9NIWc8gy5JCVzSGrlkPWhxyysjlk1XLI+pBDVjaHrFoOWR9yyMrmkFXLIetDDlnZHLJqOWR9yCErm0NWLYesDzlkZXPIqtUIZHPmzCnOOuus4swzzwzHOBzHcRR94xvfGPFZn6el4+rSOYp6yfvrX/96sWjRouJFL3pR8ZznPMdspygHMvrviiuuKE488cTii1/8YtAJJ5zQDcdxHEULFy4c8VnSDzjggGTdXvCCFxT7779/WBjWbRZJn5D+mte8xswjVpOQcZE4+uijR/S9hOM4qTMalnki4dNOO62YN29e8cIXvtBsp1YjkFHJ8W54uDz88MPBoyJ1t8iB7M9//nPx8Y9/vHjxi19s5tGWmOTnn39+8be//a1TE9vwMXz9619v5hGrScie//znFz/5yU863xq/9ve//7246qqrsvhwyDrmkFXLISubQ9aHOWTVcsjK5pD1YQ5ZtRyysjlkfZhDVi2HrGwOWR/mkFXLISubQ9aHOWTVcsjKNrSQ8RP2sVLK2oBs7ty5xUte8pKwttWErLrEYpIvXrw4THqrH0SM7/Tp0808Yo0VZFa9R0spG0rIGCQqxuR75plnRk0MPlft1M/nm4aMth522GFhwVd+LUve+hjH6fg4jmPOXZHF9LPPPjtsHWH1h+ipp54qdtxxRzOPWGMFGWMy2vMF0ZbUL8GHDjKuDFSKx6fdd9+9mDVrVvHWt761mDlzZld8Jl7HSXwcJ7LS4ryZIOxRkZokTUMm+f3iF78o7rnnnhH62c9+Voq7++67S/F8Jl4+n3vuuck7GpN4++23L3bZZZfKPkG77rprEgjRWEHG3hhve9vbRtS7rXmCJO/Zs2eH8auzoYSMKxKAvexlLwuuKLnCTciKR3Vpom222aa46aabwt2szpqGjDsnV0PypewmtGzZsiRkpD/vec9L9g3pqXaKxgoyNubJnS+DzhMt9rVh/tfZUELGbZirBY2w8mhL1J92pDqtacjasIngINwLZL/5zW9Gfb4gLsxAVGcOmZJDNrgcsrI5ZEoO2eByyMrmkCk5ZIPLISubQ6bkkA0uh6xsDpmSQza4HLKyOWRKDtngcsjK5pApjRVkbayTLV++PHh0NLEmNB7WyRwyJYesbJJfkx4fl19+eehDPBOqPBxyvRvGg8eHQ6bkkJWNQWjad5ENcp5++unQl4NqPPguOmRKDlnZ2vDC/9CHPhQeQenPQUV/DLsXvkOm5JCVDcia/j0ZkKV+TZBr/I037L8nc8iUHLKyOWS2HDKHzCEz5JCVzSFTcshsc8iq5ZD1KIfMNoesWg5Zj3LIbHPIquWQ9SiHzDaHrFoOWY8aK8goL+etLscff3zx+c9/PuttMg7Z6Mgh61FjBVmuMXn/+Mc/Fq985SvD3hxWeSKHbHTkkPUoh8w2h6xaDlmPcshsc8iq5ZD1KIfMNoesWg5Zj3LIbHPIquWQ9SiHzDaHrFoOWY9yyGxzyKrlkPUoh8w2h6xa4xYyBuGd73xnaAC/9CXfWPpXwTouTq9L03GIfc1Xr14dIKqzpiFjUtKHtPvZZ5+tFL905g0s/IKasnXdkW7XgQcemISMH3XmlPunP/2peOMb31jqsziM9txzz+RbTtqA7Le//W2YL1KfuF5xXeP0ujQdp0X8dtttFy5CdTaUkFHpO++8M7z8gXzRDTfcMOKo40U6riocn6vPWbVqVZjEqUnSNGT032mnnVbMmTOn2HvvvYPe9773jQij97///UHXX3/9iHZY7bn33ntDX9YZ/XzBBReEcnV5unwp++qrr+7mrcuWOAnzVpwU3G1A9pe//CXMF6mLrpN8Fum4qnB8rj5Hx69ZsyZ55x46yDAGiYozCch7tAQ88pP9OmsaMibd/PnzQ364TIl4/EESZnuCV7/61WHPDd6OabVBRP+l2kEexx57bChXl6PrgHhbyoMPPmiWE4u+SZXbBmTMmdGeLyinvUMJ2bBb05DlOggz6V71qleFx7fU3TbHuPofc8wxAV6rPBHg8TdPU9YGZMNsDlkf5pANZg5ZtRyyjjlkg5lDVi2HrGMO2WDmkFXLIeuYQzaYOWTVcsg65pANZg5ZtRyyjjlkg5lDVq1GIDvzzDPDJB3PYpI89NBDYcV/WCFj3ciquxbeHEDGuPHmFi3KkiMwsE5m5RGLejW1Tobr2Nq1a81yxpMY3+9973thvdFqp1YjkH3pS18Kd4HxLAC74447wh0gtdfGWEHGXep3v/udWX8R7fjCF75QTJs2rXjd6143QrxgQo4ITw4rj1ibNm1qzOODC9i1115rljOexFMAnjUs7Fvt1GoEMiYSDq48anGsCutjlazzc8L6WCXrfAlzBwMwrvTDChmuV5yr6x2H8R5ZvHhx8CDBL7JKlIfvov6ulR/aa6+9knXLhYy+pZ+tcuJ6cKySdX5OWB+rZJ0fh+GCsWX8rHZqNQIZHccVSo5xuAmNRt4crfbFGivIVqxYEc6P663DPL6cf/75YdJz96kS4ztjxozu92PpvHHsbsoLH1n1bkqjmTey2herEcgmm8YKspzX2TLJgQwfxjrDJ3AsfuoyGeWQ9SGHrGwOWbUcsj7kkJXNIauWQ9aHHLKyOWTVcsj6kENWNoesWg5ZH3LIyuaQVcsh60MOWdkcsmpVQkanrlu3rjjqqKPCpEKf/vSnw/GTn/xkkMRr5aZJXqLxlHfcaZZxkbr44ouLI444ojZvRJ7f+c53iiVLloS8RfL50ksvDTr77LNHfIdjnPeCBQvCvhi4/tQZQC9atKi2bpLGXiWsrdXZ5v+DFk+OI488svH+1mnjMW/cyLR1IXMbHeNiNhZbwrmNnTlko2wO2eQzh2yUzSGbfOaQjbI5ZJPPHLJRNods8plDNsrmkE0+c8hG2RyyyWcO2SibQzb5rAsZg8mCJhuG4L0wXkX9aUdqcrKHhbSXn/lbebUhXiklb3Xh19n86BIvG46xct/qsnnz5uDxYZUnwkMDwHOM81J9QnmUm/JaoZ9z5xTnpdpLek57UWqBXow20D9WHiLSc9prWRcyOva+++4rDjvssOAepDV37txSnMRrVZ1jxYvqvqdVdU4cR/1pR2pC0Vn8ZP8Tn/iEmU9VmaK6OmlZ6QcffHBxxRVXFFdeeWXYASmWxN96663JDW0Y+Msuu6w45JBDuvnHZSJehvHYY491vlVv69evL+bNm1fKQ+d96KGHFtdcc00ov86A4qSTTur2R1X9iOfFGalxAxy2ZaB8+Z6VN+F77rmn8616AyDpPy2dL+nnnXde8Ozp1bqQ0Vk333xz2DMC/zstNg+JjzlhfaySdX5OWB+1qD/tSA0+g/n73/++mDJlStiDIidvLev8nDC+fvJWFwaXq3eVmFApyLiiMzl5/NT1icVdk013coxXXnEn1fXWR4T/Je5X1LPO6Od3v/vd4bs6nzhPjuxBkrr7UN5FF10Uyq/KDzGm1113Xedb9cYeKOznUZcf6VyoGLNerQvZRHEQpv60I3XFYTDZhYjOSznhNqleHIRzrI19F9knkXpa+Yi4WJxyyinJSQdkOBxbecTCgTl1ceSigkN0yjGZMcXBOsf4GxmgrHxEpHN349GxV3PIHLKSOWRlOWRKDpkth6zaHLIe5ZDZcsiqzSHrUQ6ZLYes2hyyHuWQ2XLIqs0h61EOmS2HrNqGEjIawCDkCvehqnhEfrlbIKfE+s7KlSvD4DPAVWK9BciY8PLmE6t+HHMglC2dq9oqYs1lm222CQNLn1t160V4kHz2s59NThLayFtdrDxi3XbbbaEdVj4ioP7qV78a3ipj5SGijWz7bfVFrJ133jkJGeN24YUXhnU/Kw8RF5Xly5ebdYqFBw7jYrVTRPpBBx0U1tSsPLRir5W+IKODmZyWmEBWfJW4k3BVYhJYZfUqJht7Tzz++ONhIleJxeANGzaExWjqXFfv1F0CMbCcx+DH39d5E546dWqoH3Ww6taLHn300eLwww8Pk8qql4j63XvvvWYesdgzJHVhoTz2DMGLxMpDRBtnz549oj+kH+K4t7zlLWGS1hkQsj/KtttuW/q+SMZz2bJlZp1iPfLII8n5R/pHPvKR4g9/+IOZh1a8QN8XZKeeemp43GlCXEXYeIQJ2sTdTE92vCCk4+Mwg7DTTjuF8ukYq24irpxWWVrAzeY3wGPlIaIszgFuqYuWVVcd1iKO8eIqm7rzAA13+Tg/K28ueqmxoDzaTPmST5wfR/oZ9zCrL2Lx6Jvjq8kk5rHNykPrwx/+8Ii6cIxFPP2S6j/S6Wfd3qq8eY+Ztr4gO+uss0JjmxDP2HfffXeAognI5LEN0TFIh0V0GO/sYjD4+8yqm4hdpKyytBgo/BGZKFYeIvqZqzsDw9UxrpeWVe9YnJPbb6k+EZFmfV+LMqWvre9LmDve7bffbvZFLABLuZGRznnIykPEmPIrBl2vKuW0F+n2Wu0W4UuqrS/ImnydLbd/HDmbgixXTHBekMczdurqyTZtVh5a9BtOvfGjQmw8DnE344rHgFh5TSTxZME/UkbbGFMgs+rUtpgv2hwyh6xVOWQOmUPWshwyh8wha1kOmUPmkLUsh8whc8halkPmkDlkLcshU5CxroBHAJu37LfffqGC++67b5CEJf4HP/hB51uDWy+QsXhM+dRD10vCqXpLnJyLmwxeAfi4rVixIhxxxZEwR8TbVVJ5f/SjHw2LrvRjnTUNGZP4TW96U/HBD35wRL0kLPUjnbU8K49YbI8wZ86cEXnEee+zzz7BDYryrTxErCd985vfDP2pZfX3qlWrkhe8XGM9DaeJuN66T3QcRx3P0ZLOQ39Xx994442dWmyxLmRUSi/01Sm1YNiL9QLZ8ccfb9anH3HnxneRyc5EYTJUidfhWHnEkj6ss6Yhwztj8eLFXW+JKnGHnT59uplHrLe//e1hXKx8RHhc4LuY43LGuFr9GmvGjBmh3KYsdz43rXgOdCEbK+sFsoULF3a+Nbj14oUPZE1ZG5DhlY7nTJ3Rz3i5W3nEwmueetYZDthNvwQwxwt/PJpD5pCV5JA1aw6ZQ1aSQ9asOWQOWUkOWbPmkDlkJTlkzZpD5pCV5JA1aw6ZQ1aSQ9asdSHj//tMPNZTWHOpE+c1Zb1Axp7vVn36EXtjsDc8C694azBZEAu2sRYsWNCp7eDWNGT8Ovlb3/pW+CGo1U4RP06dNm2amUes3XbbLfSPlY/oySefLE488cTk3hiMKefEfWr1N4vqTc0t1qpYC7Xq3o+4iDFX+UFor9aFjMFno5Xjjjsu7H6EPve5zwXJZxF7QDRlvUA2c+bMUl2sOlbVW8cRBloWcrkTyFGLONRke5uGDPcwXujAhUC3LW4/m+3wa2wrj1ivfe1rw/lVfYiOPPLIACPlW3mIeEpgTklf6r7VfY2++93v9jWJLQOyiy++uFRvqy06TuJ1GDFX+MVzP3faLmR8mbeh8N4sVvERV0kkYYk/55xzOt8a3HqBDM8MXTc56rrFcTpNx3H34srOHYBHH65UVWryzt00ZExiJjp3C90+3W5EeuqxWES94jzivMlPPGWsPETkdcstt5j9Gou5kPKYyTWezA444IBSvaU9cZxOs+IYL16fxFzp1bqQuYPw6FjTkA27AHEiOAgD3Kjuu+iQ9W8O2eiYQ6bMIbPrN1HkkDlkDlnLcsgcMoesZTlkDplD1rIcMofMIWtZDpmCjMnOoit7l7O1siUmJkc8DJqyXiBjUup6WGJQWbtJ5cV522+/fVgnw8uFeiDWxCSco17O51zWWdh/n/bmrlvViXbSL7TH6g8RfZZbHufpPq7rb0v6fCYnb4mx+gPp/uMClFonI1224db5xGJM2QpA1yulunYyXvPnzw/eH71aFzLIJwNcjXiP1a9//etwlPD69euDCHMlbsrokFzIPvOZz3TrYtWR4y9/+cvwqh46zMpDRFksqLIfPnuH8NN8fv7OER86whx1OI7jXPkecfq7Ok7OkTCL4ECRam+OaMNJJ51UrFu3rrJPOD7wwAPFDjvsYOYRi7er4P0j413X33GcnicSx/4XdX0iffbe9743gFZnPHEtXbo0uGDp71p58+IHq45WXFxv3WYEF7zBJlU/y7qQjZX1AlmOgzDvy9p7773D5LPymGjC/w+XJDwm6ox+ZhJaecTKcRDONfIhP6ucWNSPetYZ7aS9tNvKQ8TdmM15hsEcsnEuh8yWQ6bMIRtMDpkth0yZQzaYHDJbDpkyh2wwOWS2HDJlDtlgcshsOWTKHLLB5JDZcsiUOWSDySGz5ZApc8gGk0NmyyFTxiCwor7XXnuFweBlB8gKsy9EynCnYU+G2bNnd78rivOzwvpc/RkvEv05Tp81a1YxZcqURv0R2eRH6iblxeH3vOc9xdVXX52cnBMFMtJpL+2u6hMJ8woj/CZ/+tOfhqPo9ttvH/E5TuezxFWF9bn6M3lv2rSpU9stNuaQ4YuGSxf+aAyISH+WcI4jr/i2yXctWXkPKhyNeRVTk3dQXl/EpJIyrHpzpF9SPn8TBbJ4vlh9gsgHB2Hc1/qV+ITG4ZTYcEfbmEM2UQzvbLy0cYi1JlA/YpLkXFhybKJAlmv0W5Ne+L2o8iWAboOZQ2abQ+aQNWYOmW0OmUPWmDlktjlkDllj5pDZ5pA5ZI2ZQ2abQ+aQNWYOmW0OmYKMStEh/LybfShc/6+cgc+FDK8W2auEPdbxXNCSvdfR/vvvH7aEsOrUq/CEecMb3tDNW5cXl73HHnuE9lj5iFj0Z5+N1EWAtSsWjnPKpX7U0yqvV9Fv9J/krcvTstLjcCpNxyFenKGtCxmAbdiwoTjjjDOKU045Jbx7CklYx1WlcdSqSuNznCZxVWkctarS+BynSVxVGketOG358uWdXqq2XMhw9+GcRYsWhb05KEPXQZetZaVLXCqNzzquLj0+V5+jj6effnqxZs2aAFqdAeGSJUtKeWjpOMKiOF3HVaVxjKXTRVaaxFWlcdSqSvv5z3/eaf0W60LG1XrVqlXBNUhTadEah1NpOk7LSo/DqTQdp2Wlx+FUmsTxmqCU5ULGXQw/TVxvUneLa6+9Nry3y6qb/hyn6TgRZf7qV78yy4m1du3asDVgXd64fAEad7Q6w0Mj9+mI+lFPKbOqbImL0/Vn+o3+s8ppW/GFpwtZL/suTjblvGkzFzLcbnhPGC/l41GqznBw5c5n5dOreDxl96UcwwePelr5iJjMXMGZVE0Z9aOeVnm9aigdhB2yajlkZTlk+eaQZcghK8shyzeHLEMOWVkOWb45ZBlyyMpyyPLNIcuQQ1aWQ5ZvDlmGHLKyHLJ86wsyGsAg9PvL0Ry1nTeiHal9RVAOZHgYzJs3L0w+XY4uF/HLad6cA2SsTeIEUCXWeVKQUX/OSfURa0e8RCHH+Ek9FwsrHxHrWaeeempybxFMvIkQFxbdRi3WyXJeFKLbq9utw8AKZFY5udJ1rat3rNgLpi/I2EPD2vdAh0Xx57b3V9CfrfMljtf54MnB5EuBlgMZncskvvPOO0eUo8OIOt56661hDxLZN6Rq/5Cdd945WTegPe6444L3hZQnZUl5HO+4444sILBnnnkmnB/npT/fddddxSOPPBLaXWdMzsMPP7xyHw7dZt4mk7qoAM+BBx4Y2iv14WiFGTfJW5eV2q9F168qrM/Vn8l7xYoVndZvsb4ga/IlgGNlrMo//PDDxdZbb50c2BzIco1J2eRLALlz5uxWNVZGe5l8Vt37ERfFY445JvmeMO4mQ+cg7JDZbUUOWf/mkDlkDlnL5pA5ZA5Zy+aQOWQOWcvmkDlkDlnL5pA5ZA5Zy+aQOWQOWcvmkDlkDlnL5pC1BBk/OadzN27cGLwg8ElDvL1FH3WY8whzlO/wWadLnJwjaRLP8aGHHgoDQCfXWdOQ0d7HHnsslF9X7wcffDDsAcHP41Pl5giPD/YKWbduXWWfcGT/FsY4xwCW83W947xJf+qpp5L+l6R/7GMfK2bMmBHEjlTTp08PRz4TRoR32GGHZJ+0ARmuXDvttFO3HlInqWOq3sRJPMdrrrmmU4st1hpkOMzuvvvuYTLhCpMSDbXiLdWdi1/gTTfdlNxhqmnIGPT58+cHnz6rXoh6I3zrmgAM4XbFHVH89arEOABGjuFSxWSW71r9Tb997WtfS95B5YLLeFhiHCT8wAMPhLKsdoragIynCnbJ0nVJqe7c+MLTGmT4v82cOTMMiJVHW6L+tCN11W4aslwv/LES48AdKMfw+wNaKx8Rj6lj4YXfBmRcmFMbAg1iDplDVjKHrFlzyByykjlkzZpD5pCVzCFr1hwyh6xkDlmz5pA5ZCVzyJo1h8whK5lD1qw5ZEMMGetf5IeYXHLUYfoXIFJtYP3p/vvvD+taKd1yyy1JbxTK//KXvxy8V6w8REze1IK1GAv5rDNKG6Wduv2MF5A9/fTTZnki4OetLvq7Eo7z3nbbbZPzZRBzyIYYsh133LE4+uijw54qiMmlw2jBggXFLrvskrzzAA2eIbhgaS1evDhIh9kzJAfaffbZpzjnnHNG5BHnfeGFFxaPPvpop5fq7YknniiOPfbYbtus9qKvfOUrxXnnnTeiHF2+hHlzTl0+Erdw4cKwYN6WOWRDDNkHPvCBkC+PRlV68sknw1tncK+y8hDhGcI5eH6IeORDOg5xXmoDH/oM0Ghv/H0kedO/bLqTY0x07kBWO0Xs8gVEbKtnlYukTez2ZeURi7stj5dtmUM2xJDxN0Vq8JkkXJV5/LHyGGtxh+VvvKaMR0HuUoBklSdiTMf1vosOWdkcMlsOmUPmkLUsh8whc8halkPmkDlkLcshc8gcspblkDlkDlnLcsgcsnEPGetKLKgy6WhHnVJrXyLOs76vxTk5+QEZL72gHSkxb1IGZBdccEEYZ6teIsqNX/wwVuaQjXPIWMC97777iuuuuy5MKq7eHCXMm2s4Llu2rNhuu+3McmLxNhkWcnUecd7sY0F7U+NL377rXe8KbdHad999w3G//fbrho844oik5wXpjNvKlStDfSxJHXM9Tdo2h2ycQ5Zr7D3BJi9WObHYXSo12bmDnnzyycnHtl5E/ajnRDOHzCErySFr1hwyh6wkh6xZc8gcspIcsmbNIXPISnLImjWHzCErySFr1hwyh6wkh6xZc8gcspIcsmbNIXPISnLImrXWIGMQZs+eXUydOjXsBiTiZ+P6c6y69Jzv4tWwZs2aAFGdTRTI2KSGvmZjGTa1icXP9Tk+/vjjYc8Qq5xYs2bNCvttyHct4U1xwgknZG17wJyyxiqO23XXXZNw0162C+AibtULUW80LMC2AhlGZzCRyRfRMbGq4ntRnAcdy0ABep1NFMjw5WPzGd5MQtmIiS9hHZdqp4hNd6w8JB+OPKHgH5jKk7zY/UqPUZUYk9S4cd5FF10UII3rpsUdFlezYbDWIBt2myiQuRe+LcYUP8ZhMIfMIWtVDplD5pC1LIfMIXPIWpZD5pA5ZC3LIXPIHLKW5ZA5ZA5Zy3LI+oTsjDPOKK1xjDcBxfr160N7xzNkTDq9Tla3vpVqp0jWySSv+Fgl63xguO2228wxiMUaZy/rZLqcOMxFh20T4jL6FXyw/poaD8v6guzggw8urrrqquLKK68cIeJiVcWL6r6nVXWOFS+q+97SpUvDFZGBSW0IM8yQMTEvu+yy4pBDDgnlz507NxxjHXTQQeG1RFY5saZMmRLOj/OoyltUlf7tb3+7O451Y/KjH/0o+ZolnkCuv/764tBDDw15U6aWLvfcc8/t5h2Xp1VXJ9H3v//9cEfux4ukL8hY7Y/fpCHi+8hKQ6m0QdOteBR/lyssVzweZ6w2ag0zZExKBp47GnWoEm5G06ZNM8uJtdtuuwU3LSufXoX70x577DFiLJA1lm9+85sDRHVGf+S099lnnw3vJ9P5i3qZJyLcvgCbcnu1viCbbBpmyHKNidmkg3CukQ/5WeXEatJBmH6j/6xy+hHjyvgyzr2aQ5Yhh6x/c8gcsiw5ZP2bQ+aQZckh698cMocsSw5Z/+aQOWRZcsj6N4fMIcuSQ9a/OWQOWZYcsv7NIVOQsai5cePG4AlxySWXBC1ZsiQcL7300iCJT6WJdJqcL+r1+3Vpbee9du3aTi9VG4uoq1evLi6//PKe8tZpcb1vvPHGpJtRrjG+vIlFl19VLm9EaQpu8iE/q1yRpFG/lMdHrtFv9J8uN9XfOk0kaYwr45taLLesC5mbm1s75pC5ubVsDpmbW8vmkLm5tWwOmZtby+aQubm1akXxP64B4s8daPpzAAAAAElFTkSuQmCC">
		    	<div style="font-family: '微软雅黑';font-size: 30px;font-weight: 900px;">#${data[i].pno}</div>
		    	<div style="font-family: '微软雅黑';font-size: 18px;padding-top: 3%;">柜门：${data[i].lattice_num}</div>
		    	<div style="font-family: '微软雅黑';font-size: 18px;padding-top: 3%;">柜机：${data[i].device_code}</div>
				<div style="font-family: '微软雅黑';font-size: 18px;padding-top: 3%;">制作/食用日期：${data[i].date}</div>
			</div>
		`
        LODOP.PRINT_INIT(data[i].date + '-' + data[i].deviceCode + '-' + data[i].latticeNum);
        LODOP.ADD_PRINT_HTM(30,5,"100%","80%",html);
        LODOP.PRINT();
    }
    return success();
    //
    // console.log('====获取到的标签数据=========')
    // console.log(data)
    // console.log('===========================')
}