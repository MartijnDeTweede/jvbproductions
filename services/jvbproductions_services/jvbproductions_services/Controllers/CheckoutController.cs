using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using jvbproductions_services.DTO;
using jvbproductions_services.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Mollie.Api.Client;
using Mollie.Api.Client.Abstract;
using Mollie.Api.Models;
using Mollie.Api.Models.Payment.Request;
using Mollie.Api.Models.Payment.Response;

namespace jvbproductions_services.Controllers
{
    public class CheckoutController : Controller
    {

        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/checkout/finalizeCheckout/")]
        public async Task<ActionResult> FinalizeCheckoutAsync([FromBody] CheckoutDTO checkoutDto)
        {

            var productsQueryHelper = new ProductsQueryHelper();
            var amountDue = productsQueryHelper.getAmountDue(checkoutDto.ProductCode);

            var transactionId = Guid.NewGuid();

            try
            {
                var apiKey = "test_4mW9jTeEVAc7EGAD6w8yp7nkFfgQf2";
                IPaymentClient paymentClient = new PaymentClient(apiKey);
                PaymentRequest paymentRequest = new PaymentRequest()
                {
                    Amount = new Amount(Currency.EUR, amountDue.ToString(new CultureInfo("en-US"))),
                    Description = "Test payment of the example project",
                    //WebhookUrl = string.Format("http://localhost:65422/api/checkout/FinalizePayment/{0}", transactionId),
                    WebhookUrl = "https://webhook.site/d5b05dad-95c8-49cd-80f5-1fdde8217b5f",
                    Method= Mollie.Api.Models.Payment.PaymentMethod.Ideal,
                    RedirectUrl = "http://google.com"
                };

                PaymentResponse paymentResponse = await paymentClient.CreatePaymentAsync(paymentRequest);

                var link = paymentResponse.RedirectUrl;
                var id = paymentResponse.Id;


                // update transaction librairy

                return Ok();

            } catch(Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/checkout/FinalizePayment/")]
        public ActionResult FinalizePayment(string transActionId)
        {
            return Ok();
        }
    }
}