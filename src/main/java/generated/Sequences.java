/**
 * This class is generated by jOOQ
 */
package generated;


import javax.annotation.Generated;

import org.jooq.Sequence;
import org.jooq.impl.SequenceImpl;


/**
 * Convenience access to all sequences in public
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.7.4"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Sequences {

	/**
	 * The sequence <code>public.system_sequence_c73c8c91_a6bc_40bb_bffa_7edae88aae52</code>
	 */
	public static final Sequence<Long> SYSTEM_SEQUENCE_C73C8C91_A6BC_40BB_BFFA_7EDAE88AAE52 = new SequenceImpl<Long>("system_sequence_c73c8c91_a6bc_40bb_bffa_7edae88aae52", Public.PUBLIC, org.jooq.impl.SQLDataType.BIGINT);
}
