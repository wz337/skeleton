package controllers;

import api.CreateReceiptRequest;
import api.ReceiptResponse;
import dao.ReceiptDao;
import dao.TagDao;
import generated.tables.records.ReceiptsRecord;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Path("/tags/{tag}")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
@Produces(MediaType.APPLICATION_JSON)
public class TagController {
    final ReceiptDao receipts;
    final TagDao tags;

    public TagController(ReceiptDao receipts, TagDao tags) {
        this.receipts = receipts;
        this.tags = tags;
    }

    @PUT
    public void toggleTag(@PathParam("tag") String tagName, @NotNull String receiptId) {
        tags.tag(tagName, Integer.parseInt(receiptId));
    }

    @GET
    public List<ReceiptResponse> getReceipts(@PathParam("tag") String tagName) {
        List<ReceiptsRecord> receiptRecords = tags.getTaggedReceipts(tagName);
        return receiptRecords.stream().map(ReceiptResponse::new).collect(toList());
    }

}
