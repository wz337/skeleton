package dao;

import api.ReceiptResponse;
import generated.tables.records.ReceiptsRecord;
import generated.tables.records.TagsRecord;
import org.apache.commons.lang3.ObjectUtils;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.Result;
import org.jooq.Record;
import org.jooq.impl.DSL;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkState;
import static generated.Tables.RECEIPTS;
import static generated.Tables.TAGS;

public class TagDao {
    DSLContext dsl;

    public TagDao(Configuration jooqConfig) {
        this.dsl = DSL.using(jooqConfig);
    }

    public void tag(String tagName, int receiptId) {
        TagsRecord tagsRecord = dsl
                                .selectFrom(TAGS)
                                .where(TAGS.RECEIPT_ID.eq(receiptId).and(TAGS.TAG.eq(tagName)))
                                .fetchOne();

        if (tagsRecord == null) {
            dsl.insertInto(TAGS, TAGS.TAG, TAGS.RECEIPT_ID).values(tagName, receiptId).execute();
        } else {
            dsl.delete(TAGS).where(TAGS.RECEIPT_ID.eq(receiptId).and(TAGS.TAG.eq(tagName))).execute();
        }

//        TagsRecord temp = dsl.selectFrom(TAGS).fetchAny();
//        System.out.println(temp);
    }

    public List<ReceiptsRecord> getTaggedReceipts(String tagName)
    {
        Result<?> result = dsl
                .select(RECEIPTS.ID, RECEIPTS.MERCHANT, RECEIPTS.AMOUNT, RECEIPTS.UPLOADED)
                .from(RECEIPTS)
                .leftOuterJoin(TAGS).on(TAGS.RECEIPT_ID.eq(RECEIPTS.ID))
                .where(TAGS.TAG.eq(tagName))
                .fetch();

        List<ReceiptsRecord> queryResult = new ArrayList<>();

        for(Record r: result){
            ReceiptsRecord receiptsRecord = r.into(RECEIPTS);
            //System.out.println(receiptsRecord);
            queryResult.add(receiptsRecord);
        }
        return queryResult;
    }

    public List<ReceiptsRecord> getAllTaggedReceipts(){
        Result<?> result = dsl
                .select(RECEIPTS.ID, RECEIPTS.MERCHANT, RECEIPTS.AMOUNT, RECEIPTS.UPLOADED)
                .from(RECEIPTS)
                .leftOuterJoin(TAGS).on(TAGS.RECEIPT_ID.eq(RECEIPTS.ID))
                .where(TAGS.TAG.isNotNull())
                .fetch();

        List<ReceiptsRecord> queryResult = new ArrayList<>();

        for(Record r: result){
            ReceiptsRecord receiptsRecord = r.into(RECEIPTS);
            //System.out.println(receiptsRecord);
            queryResult.add(receiptsRecord);
        }
        return queryResult;
    }
}
